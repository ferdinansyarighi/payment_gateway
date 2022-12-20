<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use App\Models\Payment;
use App\Models\PaymentBackup;
use Illuminate\Http\Request;
use Carbon\Carbon;

class PaymentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Payment  $payment
     * @return \Illuminate\Http\Response
     */
    public function show(Payment $payment)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Payment  $payment
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Payment $payment)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Payment  $payment
     * @return \Illuminate\Http\Response
     */
    public function destroy(Payment $payment)
    {
        //
    }

    public function order_payment(Request $request)
    {
        if($request->bearerToken() != Carbon::now()->format('Ymd')){
            return response()->json('Masukkan bearer token dengan nilai "yyyyMMdd" hari ini !', 401, [], JSON_NUMERIC_CHECK);
        }

        $request->validate([
            'amount' => 'required',
            'name' => 'required',
            'expired' => 'required',
        ]);

        if($request->amount < 0){
            return response()->json('Price must be positive !', 422, [], JSON_NUMERIC_CHECK);
        }

        $expiry_date = urldecode($request->expired);

        if($expiry_date < Carbon::now()){
            return response()->json('Expired date not valid !', 422, [], JSON_NUMERIC_CHECK);
        }

        $amount = $request->amount + 2500;
        $code = "8834".$request->hp;

        $data = Payment::create([
            'amount' => $amount,
            'name' => $request->name,
            'reff_no' => $request->reff,
            'expiry_date' => $request->expired,
            'status' => 'unpaid',
            'no_hp' => $request->hp,
            'code' => $code
        ]);

        if($data){
            $data['order'] = ([
                'amount' => $data->amount,
                'reff' => $data->reff_no,
                'expired' => $data->expiry_date,
                'name' => $data->name,
                'code' => $data->code,
            ]);

            return response()->json($data['order'], 200, [], JSON_NUMERIC_CHECK);
        }else{
            return response()->json('Data gagal disimpan !', 500, [], JSON_NUMERIC_CHECK);
        }
    }

    public function payment(Request $request)
    {
        if($request->bearerToken() != Carbon::now()->format('Ymd')){
            return response()->json('Masukkan bearer token dengan nilai "yyyyMMdd" hari ini !', 401, [], JSON_NUMERIC_CHECK);
        }

        $request->validate([
            'reff' => 'required'
        ]);

        $payments = DB::table('payments')->where('reff_no', $request->reff)->first();

        if(!$payments){
            return response()->json('Reff tidak ditemukan!', 403, [], JSON_NUMERIC_CHECK);
        }

        if($payments->status == "expired"){
            return response()->json('Order sudah kadaluwarsa, silahkan buat order baru!', 403, [], JSON_NUMERIC_CHECK);
        }else if($payments->status == "paid"){
            return response()->json('Order ini sudah dibayar!', 403, [], JSON_NUMERIC_CHECK);
        }else if($payments->expiry_date < Carbon::now()){
            Payment::where('reff_no', $request->reff)
                ->update([
                            'status' => "expired",
                        ]);
            return response()->json('Order sudah kadaluwarsa, silahkan buat order baru!', 403, [], JSON_NUMERIC_CHECK);
        }

        $data = Payment::where('reff_no', $request->reff)
                ->update([
                            'status' => "paid",
                            'paid_date' => Carbon::now()
                        ]);

        if($data){
            $paid = Payment::where('reff_no', $request->reff)->first();
            $backup = $paid->replicate();
            $backup = $backup->toArray();
            PaymentBackup::firstOrCreate($backup);

            $paid['payment'] = ([
                'amount' => $payments->amount,
                'reff' => $payments->reff_no,
                'name' => $payments->name,
                'code' => $payments->code,
                'status' => "paid",
            ]);

            return response()->json($paid['payment'], 200, [], JSON_NUMERIC_CHECK);
        }else{
            return response()->json('Data gagal disimpan !', 500, [], JSON_NUMERIC_CHECK);
        }
    }

    public function status(Request $request)
    {
        if($request->bearerToken() != Carbon::now()->format('Ymd')){
            return response()->json('Masukkan bearer token dengan nilai "yyyyMMdd" hari ini !', 401, [], JSON_NUMERIC_CHECK);
        }

        $request->validate([
            'reff' => 'required'
        ]);

        $payments = DB::table('payments')->where('reff_no', $request->reff)->first();

        if(!$payments){
            return response()->json('Reff tidak ditemukan!', 403, [], JSON_NUMERIC_CHECK);
        }

        $paid['payment'] = ([
            'amount' => $payments->amount,
            'reff' => $payments->reff_no,
            'name' => $payments->name,
            'expired' => $payments->expiry_date,
            'paid' => $payments->paid_date,
            'code' => $payments->code,
            'status' => $payments->status,
        ]);

        return response()->json($paid['payment'], 200, [], JSON_NUMERIC_CHECK);
    }
}
