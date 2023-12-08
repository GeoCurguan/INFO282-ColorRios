<?php

namespace App\Controller;

use App\Entity\ColorStat;
use App\Repository\ColorRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;

use App\Service\VisitCounter;

use Google_Service_Sheets;

class ColorStatController extends AbstractController
{
    private EntityManagerInterface $entityManager;
    private ColorRepository $colorRepository;

    public function __construct(EntityManagerInterface $entityManager, ColorRepository $colorRepository)
    {
        $this->entityManager = $entityManager;
        $this->colorRepository = $colorRepository;
    }

    public function createColorStat(): Response
    {
        $client = new \Google_Client();
        $client->setApplicationName('Sheets and php');
        $client->setScopes([\Google_Service_Sheets::SPREADSHEETS]);

        //Acceder a la variable de entorno y decodificar el JSON
        /*
        $googleAuthConfig = json_decode($_ENV['GOOGLE_AUTH_CONFIG'] ?? '{}', true);

        $client->setAuthConfig($googleAuthConfig);
        */
        $client->setAuthConfig(__DIR__ . '/credentials.json'); #Pasar carga de variable a .env
        $service = new Google_Service_Sheets($client);
        $spreadsheetId = "1n2IdxzwSSO8mXaeZI8p7j2ZFZXObtBD_NPjjnUls6yU";

        $range =  "BASE_GENERAL!A3:AU500";

        $response = $service->spreadsheets_values->get($spreadsheetId, $range);
        $values = $response->getValues();

        if (empty($values)) {
            return new JsonResponse(['message' => 'Datos insuficientes en el JSON'], Response::HTTP_BAD_REQUEST);
        }

        $colorRepository = $this->entityManager->getRepository(Color::class);

        foreach ($values as $value) {
            //Sólo insertamos datos con la data requerida
            if (count($value) === 47) {
                $rowID = $value[0] ? $value[0] : null;

                $color = $colorRepository->findOneBy(['rowID' => $rowID]);
                if ($color === null && $rowID !== null) {
                    return $this->json(['error' => 'ID de fila no válido.'], Response::HTTP_BAD_REQUEST);
                }

                //Adaptación de la lógica original para obtener datos de Google Sheets
                $year = $value[5];
                $monthName = $value[6];
                $day = $value[7];

                if ($year !== null && $monthName !== null && $day !== null) {
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

                    if (!$color) {
                        return $this->json(['error' => 'Color no encontrado.'], Response::HTTP_NOT_FOUND);
                    }

                    $colorStat = new ColorStat();
                    $colorStat->setIdColor($color->getId());
                    $colorStat->setDate($date);
                    $colorStat->setColor($color);
                    $colorStat->setClicks(0);
                    $colorStat->setCantPalettes(0);
                    $colorStat->setTracking(null);

                    $this->entityManager->persist($colorStat);
                    $this->entityManager->flush();
                }
            }
        }

        return $this->json(['message' => 'Estadísticas de color creadas.'], Response::HTTP_OK);
    }

    public function getColorDates(VisitCounter $visitCounter): JsonResponse
    {
        //Verificar si el usuario tiene el rol necesario (ROLE_ADMIN)
        $security = $this->container->get('security.authorization_checker');

        if (!$security->isGranted('ROLE_ADMIN')) {
            //Si no tiene el rol necesario, se le deniega el acceso
            return new JsonResponse(['message' => 'Acceso denegado'], Response::HTTP_FORBIDDEN);
        }

        $colorRepository = $this->entityManager->getRepository(ColorStat::class);
        $colores = $colorRepository->findAll();

        $coloresArray = [];

        foreach ($colores as $color) {
            $coloresArray[] = [
                'id' => $color->getId(),
                'idColor' => $color->getIdColor(),
                'fecha' => $color->getDate(),
            ];
        }

        $visitCounter->countVisit('/admin');

        return new JsonResponse(['colors' => $coloresArray], Response::HTTP_OK);
    }
}