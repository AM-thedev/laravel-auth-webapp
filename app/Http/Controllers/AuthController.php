<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $fields = $request->validate([
            'username' => 'required|string|unique:users,username|max:30',
            'phone' => 'required|digits_between:9,11',
            'email' => 'required|string|unique:users,email|max:50',
            'password' => 'required|string|confirmed|max:50'
        ]);

        $user = User::create([
            'username' => $fields['username'],
            'phone' => $fields['phone'],
            'email' => $fields['email'],
            'password' => bcrypt($fields['password'])
        ]);

        $token = $user->createToken('myapptoken')->plainTextToken;

        $response = [
            'user' => $user,
            'token' => $token
        ];

        return response($response, 201);
    }

    public function login(Request $request)
    {
        $fields = $request->validate([
            'username' => 'required|string|max:30',
            'password' => 'required|string|max:50'
        ]);

        $user = User::where('username', $fields['username'])->first();

        if(!$user || !Hash::check($fields['password'], $user->password)) {
            return response([
                'message' => 'Bad credentials.'
            ], 401);
        }

        $token = $user->createToken('myapptoken')->plainTextToken;

        $response = [
            'user' => $user,
            'token' => $token
        ];

        return response($response, 201);
    }

    public function logout(Request $request) {
        auth()->user()->tokens()->delete();

        return [
            'message' => 'Logged out.'
        ];
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $fields = $request->validate([
            'username' => 'sometimes|nullable|unique:users,username|max:30',
            'phone' => 'sometimes|nullable|digits_between:9,11',
            'email' => 'sometimes|nullable|unique:users,email|max:50',
        ]);

        $filtered = array_filter($request->all());

        auth()->user()->update($filtered);
        return auth()->user();
    }

    public function get(Request $request)
    {
        return $request->user();
    }
}
