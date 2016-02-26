<?php
$data = file_get_contents("php://input");
$data = json_decode($data, TRUE);
  echo "<pre/>";
  print_r($data);
?>