import {defineConfig} from 'vite';
import {svelte} from '@sveltejs/vite-plugin-svelte';
import {mdsvex} from 'mdsvex';
import path from 'node:path';
export default defineConfig({resolve:{alias:{'#lib':path.resolve('src/lib')}},plugins:[svelte({extensions:['.svelte','.svx'],preprocess:mdsvex({extensions:['.svx'],layout:{runbook:path.resolve('src/lib/layouts/runbook.svelte')}})})],build:{outDir:'dist'}});
