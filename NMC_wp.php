<?php
/**
 * Plugin Name: Nomanic Objects
 * Plugin URI: http://www.nomanic.biz/
 * Description: A Charting and Interface Package
 * Version: 4.1
 * Author: Neil Oman
 * Author URI: http://www.nomanic.biz/
 * License: Attribution-NonCommercial 3.0 Unported (CC BY-NC 3.0)
 *
 * Copyright 2018  Nomanic  (email : nomanic99@gmail.com)
 *
 * Read more about it here-
 * https://creativecommons.org/licenses/by-nc/3.0/
 *
 * Basically free for non-commercial use only.
 * If you wish to buy a license, please visit my website.
 */

function NMC_adding_scripts() {
wp_register_script('NMObjs', plugins_url('NMObjs.js', __FILE__));
wp_enqueue_script('NMObjs');
}
  
add_action( 'wp_enqueue_scripts', 'NMC_adding_scripts' );  
?>