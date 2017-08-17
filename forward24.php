<?php

include('simple_html_dom.php');

set_time_limit(0);
error_reporting(E_ALL ^ E_NOTICE);
ini_set("memory_limit","512M");

//set the directory for the cookie using defined document root var
//$path = $_SERVER["DOCUMENT_ROOT"].'/2d'.'/pavi';
//$cookie_file_path = $path."/cookies.txt";

$html = new simple_html_dom(); 

$url = 'https://forward.fmh.de/rechner/fmh2/schnellcheck.aspx';
$plink = '#btnBerechnen';

//exec('casperjs am.js '.escapeshellarg($adobemuse_url).' '.escapeshellarg($email).' '.escapeshellarg($password).' > adobemuse.html');
exec('phantomjs pforward36.js '.escapeshellarg($url).' '.escapeshellarg($plink).' > forward.html');

$content = file_get_contents('forward.html');
$html->load($content);
echo $content;
	
//#resultTable > tbody > tr:nth-child(2) > td.col-anbieter > a.infolink > img; //#resultTable > tbody > tr:nth-child(4) > td.col-anbieter > a.infolink > img
//#resultTable > tbody > tr:nth-child(2) > td.col-sollzins

$img = $html->find('a.infolink > img');	
$sollzins = $html->find('tbody > tr:nth-child(2) > td.col-sollzins');
//echo sizeof($sollzins).'</br>';
//echo $sollzins[0]->plaintext.'</br>';
$szimg =sizeof($img);
//$szimg
$record = array();
for($i=0; $i < $szimg; $i++){
	$bankname =  $img[$i]->alt;
	$sollzin = $sollzins[$i]->plaintext;
	$image = $img[$i]->src;
	//echo $bankname.' '.$sollzin.'</br>';
	$record[$i]['leadtime'] = 24;
	$record[$i]['bankname'] = $bankname;
	$record[$i]['sollzin'] = $sollzin;
	$record[$i]['image'] = $image;
}

//echo json_encode($record);	
	
echo 'Done';

?>