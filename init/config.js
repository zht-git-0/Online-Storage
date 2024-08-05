var current_href=location.href
current_href=current_href.slice(0,current_href.lastIndexOf('/'))
var config=[//[name,detail,url]
    [//0
        "STEAM",
        "SteamSetup.exe",
        "https://cdn.akamai.steamstatic.com/client/installer/SteamSetup.exe"
    ],
    [//1
        "植物大战僵尸杂交版V2.3",
        "跟新至最新版",
        '',
    ],
    [//2
        "植物大战僵尸杂交版全通关存档",
        "已适配V2.3",
        current_href+"/src/3dmmods_植物大战僵尸杂交版v2.3-全通关存档_by_小松梦幻.zip"
    ],
    [//3
        "迷雾通",
        "免费VPN",
        current_href+"/src/geph-windows-setup.exe"
    ],
    [
        "HMCL启动器",
        "Hello Minecraft! Launcher",
        current_href+"/src/HMCL.exe"
    ]
]