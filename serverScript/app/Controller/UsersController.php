<?php
/**
 * Application level Controller
 *
 * This file is application-wide controller file. You can put all
 * application-wide controller-related methods here.
 *
 * CakePHP(tm) : Rapid Development Framework (http://cakephp.org)
 * Copyright (c) Cake Software Foundation, Inc. (http://cakefoundation.org)
 *
 * Licensed under The MIT License
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) Cake Software Foundation, Inc. (http://cakefoundation.org)
 * @link          http://cakephp.org CakePHP(tm) Project
 * @package       app.Controller
 * @since         CakePHP(tm) v 0.2.9
 * @license       http://www.opensource.org/licenses/mit-license.php MIT License
 */

App::uses('Controller', 'Controller');

/**
 * Application Controller
 *
 * Add your application-wide methods in the class below, your controllers
 * will inherit them.
 *
 * @package		app.Controller
 * @link		http://book.cakephp.org/2.0/en/controllers.html#the-app-controller
 */
class UsersController extends AppController {  
    
    
    var $components = array('Auth');
    
    /**
     * 
     * 
     * 
     */
    
    function beforeFilter() {
        parent::beforeFilter();
        $this->Auth->allow('addUser','login');
        
    }
    
    
    
    function login(){
      $this->autoRender = false; 
       if ($this->request->is('post')) {
           $data = file_get_contents("php://input");
           $data = json_decode($data, TRUE); 
           $data['password'] = $this->Auth->password($data['password']);           
        if ($this->Auth->login($data)) {  
            return json_encode(array('message' => 'You have been logged In!'));
        } else {
            return false;
         }
       } else { 
           return false;
       } 
       
    }
    
    
    
    function addUser(){
        $this->autoRender = false;
        if($this->request->is('post','put')){
           $data = file_get_contents("php://input");
           $data = json_decode($data, TRUE);
           if(count($data) > 0){
           $data['password'] = $this->Auth->password($data['password']);
           $this->User->save($data);
           } else {
               return false;
           }
        }
    }
    
    /**
     * 
     * 
     * 
     */
    
    function userList() {
        $this->autoRender = false;
        $usersList = array();
        if ($this->request->is('get')) {
            $usersList = $this->User->find('all');
            $cnt = count($usersList);
            if ($cnt > 0) {
               // return $cnt == 1 ? json_encode(array($usersList)) : json_encode($usersList);               
                return json_encode($usersList);
            } else {
                return false;
            }
        }
    }
    
    /**
     * 
     * 
     * 
     */
    
    function userDetail($id = NULL) {
        $this->autoRender = false;
        $usersDetail = array();
        if ($this->request->is('GET') && $id!=null) {
            $usersDetail = $this->User->findById($id);
            $cnt = count($usersDetail);
            if ($cnt) {
                return $cnt == 1 ? json_encode(array($usersDetail)) : json_encode($usersDetail);
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

}
