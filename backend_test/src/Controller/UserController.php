<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\Authentication\Token\UsernamePasswordToken;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use Symfony\Component\Security\Core\Security;

use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

use Doctrine\ORM\EntityManagerInterface;

use App\Entity\User;

class UserController extends AbstractController
{
    public function register(Request $request, UserPasswordHasherInterface $passwordHasher, EntityManagerInterface $entityManager): JsonResponse
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
        $password = $passwordHasher->hashPassword($user, $userData['password']);
        $user->setPassword($password);

        //Guardar el usuario en la base de datos
        $entityManager->persist($user);
        $entityManager->flush();

        return new JsonResponse(['message' => 'Usuario registrado correctamente'], Response::HTTP_CREATED);
    }

    public function login(Request $request, UserPasswordHasherInterface $passwordHasher, EntityManagerInterface $entityManager): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $username = $data['username'];
        $password = $data['password'];

        $user = $entityManager->getRepository(User::class)->findOneBy(['username' => $username]);

        if (!$user || !$passwordHasher->isPasswordValid($user, $password)) {
            throw new AuthenticationException('Invalid credentials');
        }

        $token = new UsernamePasswordToken($user, 'null', ['main'], $user->getRoles());
        $this->container->get('security.token_storage')->setToken($token);

        return new JsonResponse(['message' => 'Inicio de sesión exitoso'], Response::HTTP_OK);
    }
}
