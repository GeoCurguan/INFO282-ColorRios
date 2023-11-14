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

    public function __construct(UserPasswordHasherInterface $passwordHasher)
    {
        $this->passwordHasher = $passwordHasher;
    }
    public function register(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        //Obtener los datos del formulario
        $userData = json_decode($request->getContent(), true);

        //Crear una nueva entidad User y configura sus propiedades
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

        //Guardar el usuario en la base de datos
        $entityManager->persist($user);
        $entityManager->flush();

        return new JsonResponse(['message' => 'Usuario registrado correctamente'], Response::HTTP_CREATED);
    }

    public function login(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        //Obtener los datos del formulario
        $userData = json_decode($request->getContent(), true);

        $username = $userData['username'];
        $password = $userData['password'];

        $user = $entityManager->getRepository(User::class)->findOneBy(['username' => $username]);

        //Comprobar si el usuario es una instancia de la interfaz de User y si la contraseña es valida
        if (!$user instanceof PasswordAuthenticatedUserInterface || !$this->passwordHasher->isPasswordValid($user, $password)) {
            throw new AuthenticationException('Invalid credentials');
        }

        return new JsonResponse(['message' => 'Inicio de sesión exitoso'], Response::HTTP_OK);
    }
}
