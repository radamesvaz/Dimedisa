<?php  

// Llamando a los campos
$nombre = $_POST['Nombre'];
$correo = $_POST['Correo'];
$telefono = $_POST['Telefono'];
$mensaje = $_POST['Asunto'];

$cabeceras = 'From:'.$correo. "\r\n" .
    'Reply-To:'.$correo. "\r\n" .
    'X-Mailer: PHP/' . phpversion();


// Datos para el correo
$destinatario = "info@caxpanama.com, jesusvalera1994@gmail.com";
$asunto = "Contacto desde nuestra web CAX";

$carta = "De: $nombre \n";
$carta .= "Correo: $correo \n";
$carta .= "Telefono: $telefono \n";
$carta .= "Asunto: $mensaje";

// Enviando Mensaje
$sentMail = @mail($destinatario, $asunto, $carta, $cabeceras);

    if($sentMail) //Muestro mensajes segun se envio con exito o si fallo
    {       
$alert = "Gracias tus datos han sido recibidos";
echo "<script>";
echo "if(confirm('$alert'));";  
echo "window.location = 'https://www.cax1.com/';";
echo "</script>";
    }else{
 $alert = "Tus datos,  no se han recibibido vuelve a intertarlo";
echo "<script>";
echo "if(confirm('$alert'));";  
echo "window.location = 'http://plantillas.grupoagudo.com/truequex-2/index.html';";
echo "</script>";
    }


?>