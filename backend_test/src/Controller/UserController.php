<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Doctrine\ORM\EntityManagerInterface;

use App\Entity\User;

class UserController extends AbstractController
{
    public function register(Request $request, UserPasswordHasherInterface $passwordHasher, EntityManagerInterface $entityManager): JsonResponse
    {
        // Obtener los datos del formulario
        $userData = json_decode($request->getContent(), true);

        // Crear una nueva entidad User y configura sus propiedades
        $user = new User();
        $user->setUsername($userData['username']);
        $user->setPassword($userData['password']);
        $user->setJob($userData['job']);
        $user->setImage($userData['image']);
        $user->setRegion($userData['region']);
        $user->setGender($userData['gender']);

        // Cifrar la contraseña
        $password = $passwordHasher->hashPassword($user, $userData['password']);
        $user->setPassword($password);

        // Guardar el usuario en la base de datos
        $entityManager->persist($user);
        $entityManager->flush();

        return new JsonResponse(['message' => 'Usuario registrado correctamente'], Response::HTTP_CREATED);
    }
}
