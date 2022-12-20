<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Payment;
use App\Models\PaymentBackup;
use Yajra\DataTables\Facades\DataTables;
use Carbon\Carbon;
use Session;

class DashboardController extends Controller
{
    public function user(){
        return view('dashboard_v');
    }

    public function admin(){
        return view('dashboard_admin_v');
    }

    public function json(){
        return Datatables::of(Payment::all())->make(true);
    }
}