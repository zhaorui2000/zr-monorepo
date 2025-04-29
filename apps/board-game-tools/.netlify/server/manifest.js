export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png","svelte.svg","tauri.svg","vite.svg"]),
	mimeTypes: {".png":"image/png",".svg":"image/svg+xml"},
	_: {
		client: {start:"_app/immutable/entry/start.BeZu4wxJ.js",app:"_app/immutable/entry/app._fVkOdYa.js",imports:["_app/immutable/entry/start.BeZu4wxJ.js","_app/immutable/chunks/BZzQ0bA0.js","_app/immutable/chunks/DMq4l-h9.js","_app/immutable/chunks/DlZiENK7.js","_app/immutable/chunks/CvtXQICV.js","_app/immutable/entry/app._fVkOdYa.js","_app/immutable/chunks/DMq4l-h9.js","_app/immutable/chunks/Bns56qBP.js","_app/immutable/chunks/Br0NdsxU.js","_app/immutable/chunks/DMgJVOKm.js","_app/immutable/chunks/BrtxriLq.js","_app/immutable/chunks/DlZiENK7.js","_app/immutable/chunks/CvtXQICV.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js')),
			__memo(() => import('./nodes/4.js')),
			__memo(() => import('./nodes/5.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/agricola",
				pattern: /^\/agricola\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/api/createRoom",
				pattern: /^\/api\/createRoom\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/createRoom/_server.js'))
			},
			{
				id: "/api/getRooms",
				pattern: /^\/api\/getRooms\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/getRooms/_server.js'))
			},
			{
				id: "/create",
				pattern: /^\/create\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/join",
				pattern: /^\/join\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
