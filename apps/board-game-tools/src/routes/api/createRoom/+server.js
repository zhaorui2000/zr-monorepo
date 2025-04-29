import { json } from "@sveltejs/kit";
import { getLocalHost } from '$lib/server/getHostAddress';
import { Server } from 'socket.io';
import { createServer } from 'node:http';
import express from 'express';


export async function GET() {
    return json({})
}
