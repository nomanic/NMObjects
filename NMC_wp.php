<?php
/**
 * Plugin Name: Nomanic Objects
 * Plugin URI: http://www.nomanic.biz/NMObjects/
 * Description: A Charting and Interface Package
 * Version: 4.75
 * Author: Neil Oman
 * Author URI: http://www.nomanic.biz/
 * License: Envato Split License with GPL (see text file)
 *
 * Copyright 2018  Nomanic  (email : nomanic99@gmail.com)
 *
 * Basically free for non-commercial use only.
 * If you wish to buy a license, please visit my website.
 */

function NMC_adding_scripts() {
wp_register_script('NMKeys', plugins_url('NMKeys.js', __FILE__));
wp_enqueue_script('NMKeys');
wp_register_script('NMObjs', plugins_url('NMObjs.min.js', __FILE__));
wp_enqueue_script('NMObjs');
}
  
add_action( 'wp_enqueue_scripts', 'NMC_adding_scripts' );  
?>