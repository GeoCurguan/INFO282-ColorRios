<?php
namespace App\Controller;

use App\Entity\Color;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

use Google_Service_Sheets;

use Symfony\Component\Dotenv\Dotenv;


class ColorController extends AbstractController
{
    private $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }
    public function insertarColor(Request $request): Response
    {
        $client = new \Google_Client();
        $client->setApplicationName('Sheets and php');
        $client->setScopes([\Google_Service_Sheets::SPREADSHEETS]);

        //$dotenv = new \Dotenv(__DIR__);
        //$dotenv->load();
        
        //$CREDENTIALS = getenv('SHEET_AUTH');

        $client->setAuthConfig(__DIR__ . '/credentials.json'); #Pasar carga de variable a .env
        $service = new Google_Service_Sheets($client);
        $spreadsheetId="1mF6eQwX9fNXwv-FeZuGpHENDnlafEVRNtFcRgOViNA8";
    
        $range =  "CHROMOS!B3:AU500";
    
        $response = $service->spreadsheets_values->get($spreadsheetId, $range);
        $values = $response->getValues();

        if (empty($values)) {
            return new JsonResponse(['message' => 'Datos insuficientes en el JSON'], Response::HTTP_BAD_REQUEST);
        }

        foreach($values as $value){
            //Sólo insertamos datos con la data requerida
            if(count($value) === 46){
                
                $color = new Color();
                $color->setCategory($value[0] ? $value[0] : null);
                $color->setCommune($value[2] ? $value[2] : null);
                $color->setSeason($value[3] ? $value[3] : null);

                $color->setNcsNuance($value[24] ? $value[24] : null);
                $color->setNcsHue($value[25] ? $value[25] : null);
                //Munsell
                $color->setMunsellPage($value[26] ? $value[26] : null);
                $color->setMunsellHue($value[27] ? $value[27] : null);
                $color->setMunsellValue($value[28] ? $value[28] : null);
                $color->setMunsellChroma($value[29] ? $value[29] : null);
                $color->setMunsellName($value[30] ? $value[30] : null);
                //CIELAB
                $color->setCielabL($value[31] ? $value[31] : null);
                $color->setCielabA($value[32] ? $value[32] : null);
                $color->setCielabB($value[33] ? $value[33] : null);
                //RGB
                $color->setRgbR($value[35] ? $value[35] : null);
                $color->setRgbG($value[36] ? $value[36] : null);
                $color->setRgbB($value[37] ? $value[37] : null);
                //CMYK
                $color->setCmykC($value[38] ? $value[38] : null);
                $color->setCmykM($value[39] ? $value[39] : null);
                $color->setCmykY($value[40] ? $value[40] : null);
                $color->setCmykK($value[41] ? $value[41] : null);
                //FILTRO POR NOMBRE DE COLOR
                $color->setCategoryName($value[45] ? $value[45] : null);

                $this->entityManager->persist($color);

                /*
                $colorRepository = $this->entityManager->getRepository(Color::class);
                $existingColor = $colorRepository->findOneBy($color);

                if(!$existingColor){
                    $this->entityManager->persist($color);
                }else{
                    print("Color existe");
                }
                */
                
            }
        }

        $this->entityManager->flush();

        return new JsonResponse(['message' => 'Colores insertados'], Response::HTTP_OK);
    }

    public function getColors(): JsonResponse
    {
        //Falta validación role_admin!!11!!!1
        $colorRepository = $this->entityManager->getRepository(Color::class);
        $colores = $colorRepository->findAll();

        $coloresArray = [];

        foreach ($colores as $color) {
            $coloresArray[] = [
                'id' => $color->getId(),
                'category' => $color->getCategory(),
                'commune' => $color->getCommune(),
                'season' => $color->getSeason(),
                'colorName' => $color->getColorName(),
                'NcsNuance' => $color->getNcsNuance(),
                'NcsHue' => $color->getNcsHue(),
                'MunsellPage' => $color->getMunsellPage(),
                'MunsellHue' => $color->getMunsellHue(),
                'MunsellValue' => $color->getMunsellValue(),
                'MunsellChroma' => $color->getMunsellChroma(),
                'MunsellName' => $color->getMunsellName(),
                'L' => $color->getCielabL(),
                'A' => $color->getCielabA(),
                'B' => $color->getCielabB(),
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

        return new JsonResponse(['colors' => $coloresArray], Response::HTTP_OK);
    }
}
