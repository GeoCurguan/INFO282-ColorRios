<?php

namespace App\Controller;

use App\Entity\Color;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

use App\Service\VisitCounter;

use Google_Service_Sheets;

class ColorController extends AbstractController
{
    private $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }
    public function insertarColor(): Response
    {
        $client = new \Google_Client();
        $client->setApplicationName('Sheets and php');
        $client->setScopes([Google_Service_Sheets::SPREADSHEETS]);

        //Acceder a la variable de entorno y decodificar el JSON
        // $googleAuthConfig = json_decode($_ENV['GOOGLE_AUTH_CONFIG'] ?? '{}', true);
        // $client->setAuthConfig($googleAuthConfig);
        $client->setAuthConfig(__DIR__ . '/credentials.json');

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

                $get_color = $colorRepository->findOneBy(['rowID' => $rowID]);

                if ($get_color === null && $rowID !== null) {
                    //Insert de color nuevo
                    $color = new Color();

                    $color->setRowID(isset($value[0]) ? intval($value[0]) : null);

                    $color->setCategory($value[1] ? $value[1] : null);
                    $color->setCommune($value[3] ? $value[3] : null);
                    $color->setSeason($value[4] ? $value[4] : null);

                    $color->setNcsNuance($value[25] ? $value[25] : null);
                    $color->setNcsHue($value[26] ? $value[26] : null);
                    //Munsell
                    $color->setMunsellPage($value[27] ? $value[27] : null);
                    $color->setMunsellHue($value[28] ? $value[28] : null);
                    $color->setMunsellValue($value[29] ? $value[29] : null);
                    $color->setMunsellChroma($value[30] ? $value[30] : null);
                    $color->setMunsellName($value[31] ? $value[31] : null);
                    //CIELAB
                    $color->setCielabL($value[32] ? gettype($value[32]) !== 'integer' ? intval($value[32])  : $value[32] : null);
                    $color->setCielabA($value[33] ? gettype($value[33]) !== 'integer' ? intval($value[33])  : $value[33] : null);
                    $color->setCielabB($value[34] ? gettype($value[34]) !== 'integer' ? intval($value[34])  : $value[34] : null);
                    //RGB
                    $color->setRgbR($value[36] ? gettype($value[36]) !== 'integer' ? intval($value[36]) : $value[36] : null);
                    $color->setRgbG($value[37] ? gettype($value[37]) !== 'integer' ? intval($value[37]) : $value[37] : null);
                    $color->setRgbB($value[38] ? gettype($value[38]) !== 'integer' ? intval($value[38]) : $value[38] : null);
                    //CMYK
                    $color->setCmykC($value[39] ? gettype($value[39]) !== 'integer' ? intval($value[39])  : $value[39] : null);
                    $color->setCmykM($value[40] ? gettype($value[40]) !== 'integer' ? intval($value[40])  : $value[40] : null);
                    $color->setCmykY($value[41] ? gettype($value[41]) !== 'integer' ? intval($value[41])  : $value[41] : null);
                    $color->setCmykK($value[42] ? gettype($value[42]) !== 'integer' ? intval($value[42])  : $value[42] : null);
                    //FILTRO POR NOMBRE DE COLOR
                    $color->setCategoryName(isset($value[46]) ? $value[46] : null);

                    $this->entityManager->persist($color);
                } else if ($rowID !== null) {
                    //Update
                    $get_color->setCategory($value[1] ? $value[1] : null);
                    $get_color->setCommune($value[3] ? $value[3] : null);
                    $get_color->setNcsNuance($value[25] ? $value[25] : null);
                    $get_color->setNcsHue($value[26] ? $value[26] : null);
                    //Munsell
                    $get_color->setMunsellPage($value[27] ? $value[27] : null);
                    $get_color->setMunsellHue($value[28] ? $value[28] : null);
                    $get_color->setMunsellValue($value[29] ? $value[29] : null);
                    $get_color->setMunsellChroma($value[30] ? $value[30] : null);
                    $get_color->setMunsellName($value[31] ? $value[31] : null);
                    //CIELAB
                    $get_color->setCielabL($value[32] ? gettype($value[32]) !== 'integer' ? intval($value[32])  : $value[32] : null);
                    $get_color->setCielabA($value[33] ? gettype($value[33]) !== 'integer' ? intval($value[33])  : $value[33] : null);
                    $get_color->setCielabB($value[34] ? gettype($value[34]) !== 'integer' ? intval($value[34])  : $value[34] : null);
                    //RGB
                    $get_color->setRgbR($value[36] ? gettype($value[36]) !== 'integer' ? intval($value[36]) : $value[36] : null);
                    $get_color->setRgbG($value[37] ? gettype($value[37]) !== 'integer' ? intval($value[37]) : $value[37] : null);
                    $get_color->setRgbB($value[38] ? gettype($value[38]) !== 'integer' ? intval($value[38]) : $value[38] : null);
                    //CMYK
                    $get_color->setCmykC($value[39] ? gettype($value[39]) !== 'integer' ? intval($value[39])  : $value[39] : null);
                    $get_color->setCmykM($value[40] ? gettype($value[40]) !== 'integer' ? intval($value[40])  : $value[40] : null);
                    $get_color->setCmykY($value[41] ? gettype($value[41]) !== 'integer' ? intval($value[41])  : $value[41] : null);
                    $get_color->setCmykK($value[42] ? gettype($value[42]) !== 'integer' ? intval($value[42])  : $value[42] : null);
                    //FILTRO POR NOMBRE DE COLOR
                    $get_color->setCategoryName($value[46] ? $value[46] : null);
                }
            }
        }

        $this->entityManager->flush();

        return new JsonResponse(['message' => 'Colores insertados'], Response::HTTP_OK);
    }

    public function getColors(VisitCounter $visitCounter): JsonResponse
    {
        $colorRepository = $this->entityManager->getRepository(Color::class);
        $colores = $colorRepository->findAll();

        $coloresArray = [];

        foreach ($colores as $color) {
            $coloresArray[] = [
                'id' => $color->getId(),
                'category' => $color->getCategory(),
                'categoryName' => $color->getCategoryName(),
                'commune' => $color->getCommune(),
                'season' => $color->getSeason(),
                'NcsNuance' => $color->getNcsNuance(),
                'NcsHue' => $color->getNcsHue(),
                'MunsellPage' => $color->getMunsellPage(),
                'MunsellHue' => $color->getMunsellHue(),
                'MunsellValue' => $color->getMunsellValue(),
                'MunsellChroma' => $color->getMunsellChroma(),
                'MunsellName' => $color->getMunsellName(),
                'L*' => $color->getCielabL(),
                'A*' => $color->getCielabA(),
                'B*' => $color->getCielabB(),
                'R' => $color->getRgbR(),
                'G' => $color->getRgbG(),
                'B' => $color->getRgbB(),
                'C' => $color->getCmykC(),
                'M' => $color->getCmykM(),
                'Y' => $color->getCmykY(),
                'K' => $color->getCmykK(),
                'Ceresita' => $color->getCeresitaName(),
            ];
        }

        $visitCounter->countVisit('/');

        return new JsonResponse(['colors' => $coloresArray], Response::HTTP_OK);
    }
}
