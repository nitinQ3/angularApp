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
    
    
    /**
     * 
     * 
     * 
     */
    
    function beforeFilter($loginToken=null) {
        parent::beforeFilter();
        //$this->Auth->allow('login');
        if($loginToken!='' && $loginToken!=null && ($this->Session->read('userLoginToken')!=''  && $this->Session->read('userLoginToken')==$loginToken)){ 
                    return true;
        } else {
                if($this->Session->read('userLoginToken')=='' || $loginToken=='' || $loginToken==null){
                    $this->sessionExpire();
                }
        }
    }
    
     /**
     * 
     * 
     * 
     */
    
    
    function userLogin(){ 
        $this->autoRender = false;
        $data = array();
        $userDetail = array();
        if($this->request->is('post')){
            $data = file_get_contents("php://input");
            $data = json_decode($data, TRUE);
            $data['password'] = md5($data['password']);
            $userDetail = $this->User->find('all',array(
                                'fields'=>array(
                                      'id','username'
                                    ),
                                'conditions'=>array(
                                  'username' => $data['username'],
                                  'password' => $data['password']
                                )
                         )
                    );
            if(count($userDetail) > 0){
                $this->Session->write('userLoginToken',base64_encode($userDetail[0]['User']['id']));
                return json_encode(
                            array(
                                  'message'=>array(
                                        'success'=>'Successfully Logged In!'
                                         ),
                                  'userLoginToken'=>  base64_encode($userDetail[0]['User']['id'])
                                )
                        );
            } else {
                return json_encode(array('message'=>array('error'=>'<strong>Incorrect username or password!</strong>')));
            }
        }        
    }
    
    
    
    /**
     * 
     * 
     * 
     */
    
    function logout(){
      $this->autoRender = false; 
       $this->Session->write('userLoginToken','');
       return json_encode(array('message'=>array('logout'=>'Successfully Logged Out!')));
    }
    
    /**
     * 
     * 
     * 
     */
    
    function sessionExpire(){
      $this->autoRender = false; 
       $this->Session->write('userLoginToken','');
       return json_encode(array('message'=>array('sessionExpire'=>'Your session has been expired!')));
    }
    
     /**
     * 
     * 
     * 
     */
    
    
    function addUser(){
        $this->autoRender = false;
        if($this->request->is('post','put')){
           $data = file_get_contents("php://input");
           $data = json_decode($data, TRUE);
           if(count($data) > 0){
           $data['password'] = md5($data['password']);
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
                return json_encode(array('message'=>array('error'=>'<strong>No data available.</strong>')));;
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
