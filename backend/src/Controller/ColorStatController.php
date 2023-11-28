<?php

namespace App\Controller;

use App\Entity\ColorStat;
use App\Repository\ColorRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;

class ColorStatController extends AbstractController
{
    private EntityManagerInterface $entityManager;
    private ColorRepository $colorRepository;

    public function __construct(EntityManagerInterface $entityManager, ColorRepository $colorRepository)
    {
        $this->entityManager = $entityManager;
        $this->colorRepository = $colorRepository;
    }

    public function createColorStat(Request $request): Response
    {
        $data = json_decode($request->getContent(), true);

        if (!$data) {
            return $this->json(['error' => 'Data del JSON inválida.'], Response::HTTP_BAD_REQUEST);
        }

        if (
            isset($data['values'][0][5]) && // Año
            isset($data['values'][0][6]) && // Mes
            isset($data['values'][0][7])    // Día
        ) {
            $year = $data['values'][0][5];
            $monthName = $data['values'][0][6];
            $day = $data['values'][0][7];

            $monthNumbers = [
                'enero' => '01',
                'febrero' => '02',
                'marzo' => '03',
                'abril' => '04',
                'mayo' => '05',
                'junio' => '06',
                'julio' => '07',
                'agosto' => '08',
                'septiembre' => '09',
                'octubre' => '10',
                'noviembre' => '11',
                'diciembre' => '12',
            ];

            $month = $monthNumbers[strtolower($monthName)] ?? null;

            if ($month === null) {
                return $this->json(['error' => 'Nombre de mes no válido.'], Response::HTTP_BAD_REQUEST);
            }

            if (!is_numeric($year) || !is_numeric($month) || !is_numeric($day)) {
                return $this->json(['error' => 'El año, mes y día deben ser valores numéricos.'], Response::HTTP_BAD_REQUEST);
            }

            try {
                $date = new \DateTime("$year-$month-$day");
            } catch (\Exception $e) {
                return $this->json(['error' => 'Error al crear el objeto DateTime.'], Response::HTTP_INTERNAL_SERVER_ERROR);
            }

            $idColor = $data['values'][0][0]; //id del color debe coincidir para que se pueda buscar

            $color = $this->colorRepository->find($idColor);

            if (!$color) {
                return $this->json(['error' => 'Color no encontrado.'], Response::HTTP_NOT_FOUND);
            }

            $colorStat = new ColorStat();
            $colorStat->setIdColor($idColor);
            $colorStat->setDate($date);
            $colorStat->setColor($color);
            $colorStat->setClicks(0);
            $colorStat->setCantPalettes(0);
            $colorStat->setTracking(null);

            $this->entityManager->persist($colorStat);
            $this->entityManager->flush();

            return $this->json(['message' => 'Estadísticas de color creadas.'], Response::HTTP_OK);
        } else {
            //Elementos esperados no encontrados en el array
            return $this->json(['error' => 'Datos de fecha incompletos.'], Response::HTTP_BAD_REQUEST);
        }
    }
}
