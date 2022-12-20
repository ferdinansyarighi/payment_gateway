<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function index(){
        return view('login_v');
    }

    public function register(){
        return view('register_v');
    }

    public function proses_login(Request $request){
        request()->validate(
            [
                'email'    => 'required',
                'password' => 'required',
            ]);
        
        $remember = $request->has('remember')? true:false;
        $credentials = $request->only('email','password');

        if(Auth::attempt($credentials,$remember)){
            $user = Auth::user();

            if ($user->level == 'admin'){
                return redirect()->intended('dashboard_admin'); 
            }elseif ($user->level == 'user'){
                return redirect()->intended('dashboard');
            }

            return redirect('login')->with('error',"Email atau password salah !");
        }

        //return redirect()->intended('/login');
        return redirect('login')->with('error',"Email atau password salah !");
    }

    public function logout(Request $request){
        $request->session()->flush();
        Auth::logout();
        return redirect('login');
    }
}
