<?php
ini_set('display_errors', 1); ini_set('display_startup_errors', 1); error_reporting(E_ALL);
  $MSSG = htmlspecialchars($_GET["MSG"]);
  $Name = htmlspecialchars($_GET["Name"]);
  $EMail = htmlspecialchars($_GET["Email"]);

   $to = "jakelmuller1@gmail.com"; // <– replace with your address here
   $subject = "Contact Request";
   $msg ="
   <html>
   <head>
   <meta http-equiv='Content-Type' content='text/html; charset=UTF-8'>
   <style>
       body {
           font-family: 'Trebuchet MS','Lucida Grande','Lucida Sans Unicode','Lucida Sans',Tahoma,sans-serif !important;
           color:#787878;
       }
   </style>
   </head>
   <body>
   <table cellpadding='3' cellspacing='3' border='0' width='100%' bgcolor='#303030' style='border-collapse: collapse;background-color:#303030;'>
       <tr>
           <td align='left' width='5%'></td>
           <td valign='left' width='90%'>
               <table cellpadding='3' cellspacing='3' border='0' width='100%' height='30px'></table>
           </td>
           <td align='left' width='5%'></td>
       </tr>
   </table>
   <table cellpadding='3' cellspacing='3' border='0' width='100%' bgcolor='#303030' style='border-collapse: collapse; background-color:#303030;'>
       <tr>
           <td align='left' width='5%'></td>
           <td align='center' width='45%' bgcolor='white' style='background-color:white;'>
               <table cellpadding='3' cellspacing='3' border='0' width='100%'>
                   <tr>
                       <td align='left' style='font-size:15px; font-weight:bold;'>JakeLMuller.com</td>
                   </tr>
               </table>
           </td>
           <td align='right' width='40%' bgcolor='white' style='font-size:15px; font-weight:bold;'>
              Contact Me
           </td>
           <td align='right' width='5%' bgcolor='white'>
           </td>
           <td align='left' width='5%'></td>
       </tr>
   </table>
   <table cellpadding='3' cellspacing='3' border='0' width='100%' bgcolor='#303030' style='border-collapse: collapse; background-color:#303030;'>
       <tr>
           <td align='left' width='5%'></td>
           <td align='center' width='90%' bgcolor='#FFFFFF' style='background-color:#FFFFFF;color:#525252;Font-size: 22px;Font-weight: Bold;'>
               !Title!
           </td>
           <td align='left' width='5%'></td>
       </tr>
       <tr>
           <td align='left' width='5%'></td>
           <td align='center' width='90%'  bgcolor='#A9A9A9' style='background-color:#405169;'>
               <table cellpadding='3' cellspacing='3' border='0' >
                   <tr>
                       <td align='center' style='width: 300px;  margin: auto; min-width: 300px;'><img src='http://www.jakelmuller.com/v2/img/Logos/JMLogo.png' width='80%' align='middle' style='width:80%;' /></td>
                   </tr>
               </table>
           </td>
           <td align='left' width='5%'></td>
       </tr>
   </table>
   <table cellpadding='2' cellspacing='2' border='0' width='100%' bgcolor='#303030' style='border-collapse: collapse; background-color:#303030;'>
       <tr>
           <td align='left' width='5%'></td>
           <td valign='left' width='90%' bgcolor='#FFFFFF' style='background-color:#FFFFFF;'>
               <table cellpadding='3' cellspacing='3' border='0' width='100%' height='10px'></table>
           </td>
           <td align='left' width='5%'></td>
       </tr>
       <tr>
           <td align='left' width='5%'></td>
           <td align='center' width='90%' bgcolor='#FFFFFF' style='background-color:#FFFFFF; font-weight:bold;font-size:17px'>Hello Jake,</td>
           <td align='left' width='5%'></td>
       </tr>
       <tr>
           <td align='left' width='5%'></td>
           <td valign='left' width='90%' bgcolor='#FFFFFF' style='background-color:#FFFFFF;'>
               <table cellpadding='3' cellspacing='3' border='0' width='100%' height='30px'></table>
           </td>
           <td align='left' width='5%'></td>
       </tr>

       <tr>
           <td align='left' width='5%'></td>
           <td align='center' width='90%' bgcolor='#FFFFFF' style='background-color:#FFFFFF;'>
               !USERS! has Sent a Contact Request!
           </td>
           <td align='left' width='5%'></td>
       </tr>
       <tr>
           <td align='left' width='5%'></td>
           <td align='center' width='90%' bgcolor='#FFFFFF' style='background-color:#FFFFFF;'>!MSG!</a></td>
           <td align='left' width='5%'></td>
       </tr>
       <tr>
           <td align='left' width='5%'></td>
           <td valign='left' width='90%' bgcolor='#FFFFFF' style='background-color:#FFFFFF;'>
               <table cellpadding='3' cellspacing='3' border='0' width='100%' height='30px'></table>
           </td>
           <td align='left' width='5%'></td>
       </tr>
       <tr>
          <td align='left'></td>
          <td align='center' style='background-color: white'>
            <table cellpadding='3' cellspacing='3' border='0' width='100%' height='10px'></table>
          </td>
        </tr>
        <tr>
          <td align='left'></td>
          <td align='center' style='padding-left:1%;background-color: white;'>
            <table cellpadding='3' cellspacing='3'  width='80%' border='1' bordercolor='#FFFFFF' style='background-color:#405169; border:1px solid #FFFFFF; color:white;'>

              <tr>
                <td align='left'>NAME</td>
                <td align='left'>
                  !USERS!
                </td>
              </tr>
              <tr>
                <td align='left'>EMAIL</td>
                <td align='left'>
                  !EMAIL!
                </td>
              </tr>

            </table>
          </td>
        </tr>
        <tr>
          <td align='left'></td>
          <td align='center' style='background-color: white'>
            <table cellpadding='3' cellspacing='3' border='0' width='100%' height='10px'></table>
          </td>
        </tr>
       <tr>
           <td align='left' width='5%'></td>
           <td align='center' width='90%' bgcolor='#FFFFFF' style='background-color:#FFFFFF; font-weight:bold;font-size:17px'>Thank You,</a></td>
           <td align='left' width='5%'></td>
       </tr>
       <tr>
           <td align='left' width='5%'></td>
           <td align='center' width='90%' bgcolor='#FFFFFF' style='background-color:#FFFFFF; font-weight:bold;font-size:17px'>Jake L. Muller</a></td>
           <td align='left' width='5%'></td>
       </tr>
       <tr>
           <td align='left' width='5%'></td>
           <td valign='left' width='90%' bgcolor='#FFFFFF' style='background-color:#FFFFFF;'>
               <table cellpadding='3' cellspacing='3' border='0' width='100%' height='30px'></table>
           </td>
           <td align='left' width='5%'></td>
       </tr>
       <tr>
           <td align='left' width='5%'></td>
           <td align='center' width='90%' bgcolor='#FFFFFF' Style='font-size:10px;color:#525252;background-color:#FFFFFF;'>
           This email was sent from a notification-only address that cannot accept incoming email.
           Please do not reply to this message.</a></td>
           <td align='left' width='5%'></td>
       </tr>
       <tr>
           <td align='left' width='5%'></td>
           <td valign='left' width='90%' bgcolor='#FFFFFF' style='background-color:#FFFFFF;'>
               <table cellpadding='3' cellspacing='3' border='0' width='100%' height='30px'></table>
           </td>
           <td align='left' width='5%'></td>
       </tr>
       <tr>
           <td align='left' width='5%'></td>
           <td valign='left' width='90%'>
               <table cellpadding='3' cellspacing='3' border='0' width='100%' height='30px'></table>
           </td>
           <td align='left' width='5%'></td>
       </tr>
   </table>
   </body>


   </html>";
   $message = $msg ;
   $message =  str_replace("!USERS!",$Name,$message);
   $message =  str_replace("!EMAIL!",$EMail,$message);
   $message =  str_replace("!MSG!","'". $MSSG."'",$message);
   $TheTitle = $Name . " Has Sent a Contact Request";
   $message =  str_replace("!Title!",$TheTitle,$message);
   $message = wordwrap($message,70);

   $from = "Contact@JakeLMuller.com";

   $headers = "MIME-Version: 1.0" . "\r\n";
   $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";

// More headers
//$headers .= 'From: <webmaster@example.com>' . "\r\n";
//$headers .= 'Cc: myboss@example.com' . "\r\n";
   $headers .= "From:" . $from;
   mail("jakelmuller1@gmail.com",$subject,$message,$headers);

   $NewMessage = $msg;
   $NewMessage =  str_replace($TheTitle," ",$NewMessage);
   $NewMessage =  str_replace("Hello Jake,","Hello ".$Name.",",$NewMessage);
   $NewMessage =  str_replace("!USERS!",$Name,$NewMessage);
   $NewMessage =  str_replace("!EMAIL!",$EMail,$NewMessage);
   $NewMessage =  str_replace("!MSG!","'". $MSSG."'",$NewMessage);
   $NewMessage =  str_replace("!Title!"," Contact Me Confirmation  ",$NewMessage);
   $NewMessage = wordwrap($NewMessage,70);
   $subject = "Confirmation Request";
   mail($EMail,$subject,$NewMessage,$headers);
  $data = [ 'Success' => 'True' ];
  header('Content-type: application/json');
  echo json_encode( $data );
?>
