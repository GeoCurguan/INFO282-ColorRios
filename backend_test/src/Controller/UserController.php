<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

//Seguridad
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;


use Doctrine\ORM\EntityManagerInterface;

use App\Entity\User;

class UserController extends AbstractController
{
    private $passwordHasher;
    private EntityManagerInterface $entityManager;

    public function __construct(UserPasswordHasherInterface $passwordHasher, EntityManagerInterface $entityManager)
    {
        $this->passwordHasher = $passwordHasher;
        $this->entityManager = $entityManager;
    }
    public function register(Request $request): JsonResponse
    {
        //Obtener los datos del formulario
        $userData = json_decode($request->getContent(), true);

        //Validacion en el caso de que el nombre de usuario ya este registrado
        $existingUser = $this->entityManager->getRepository(User::class)->findOneBy(['username' => $userData['username']]);

        if ($existingUser) {
            return new JsonResponse(['message' => 'El nombre de usuario ya está registrado'], Response::HTTP_BAD_REQUEST);
        }

        //Crear un nuevo usuario
        $user = new User();
        $user->setUsername($userData['username']);
        $user->setPassword($userData['password']);
        $user->setJob($userData['job']);
        $user->setImage($userData['image']);
        $user->setRegion($userData['region']);
        $user->setGender($userData['gender']);

        //Cifrar la contraseña
        $password = $this->passwordHasher->hashPassword($user, $userData['password']);
        $user->setPassword($password);

        //Manejo de roles del usuario
        $userRoles = $userData['roles'] ?? ['ROLE_USER'];
        $user->setRoles($userRoles);

        //Guardar el usuario en la base de datos
        $this->entityManager->persist($user);
        $this->entityManager->flush();

        return new JsonResponse(['message' => 'Usuario registrado correctamente'], Response::HTTP_CREATED);
    }

    public function login(Request $request): JsonResponse
    {
        //Obtener los datos del formulario
        $userData = json_decode($request->getContent(), true);

        $username = $userData['username'];
        $password = $userData['password'];

        $user = $this->entityManager->getRepository(User::class)->findOneBy(['username' => $username]);

        //Comprobar si el usuario es una instancia de la interfaz de User y si la contraseña es valida
        if (!$user instanceof PasswordAuthenticatedUserInterface || !$this->passwordHasher->isPasswordValid($user, $password)) {
            throw new AuthenticationException('Invalid credentials');
        }

        return new JsonResponse(['message' => 'Inicio de sesión exitoso'], Response::HTTP_OK);
    }

    public function testJWT(): JsonResponse
    {
        return $this->json([
            'message' => '¡Esta es una ruta protegida!'
        ]);
    }

    public function getUsers(): JsonResponse
    {
        //Verificar si el usuario tiene el rol necesario (ROLE_ADMIN)
        $security = $this->container->get('security.authorization_checker');

        if (!$security->isGranted('ROLE_ADMIN')) {
            //Si no tiene el rol necesario, se le deniega el acceso
            return new JsonResponse(['message' => 'Acceso denegado'], Response::HTTP_FORBIDDEN);
        }

        //Obtener el repositorio de la tabla User
        $userRepository = $this->entityManager->getRepository(User::class);

        //Obtener todos los usuarios con findAll de doctrine
        $users = $userRepository->findAll();

        //Guardar los usuarios en un arreglo de JSON
        $usersData = [];
        //Recorrer cada usuario
        foreach ($users as $user) {
            $usersData[] = [
                'id' => $user->getId(),
                'username' => $user->getUsername(),
                'job' => $user->getJob(),
                'gender' => $user->getGender(),
                'region' => $user->getRegion(),
                'commune' => $user->getCommune(),
            ];
        }

        return new JsonResponse($usersData, Response::HTTP_OK);
    }
}
