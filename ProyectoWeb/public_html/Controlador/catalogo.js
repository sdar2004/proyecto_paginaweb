const productos = [
    
    // --- Samsung ---
    {
        id: 1,
        marca: "samsung",
        categoria: "telefono",
        nombre: "Samsung Galaxy S25 Ultra",
        precioOferta: "S/3200",
        precioAnterior: "S/3500",
        imagen: "Imagenes/samsung-galaxy-s25-ultra-sm-s938.jpg", 
        badge: "Nuevo",
        url: "Productos/Samsung/GalaxyS25_Ultra.html"
    },
    {
        id: 2,
        marca: "samsung",
        categoria: "telefono",
        nombre: "Samsung Galaxy S25 fe",
        precioOferta: "S/2300",
        precioAnterior: "S/2600",
        imagen: "Imagenes/samsung-galaxy-s25-fe.jpg", 
        badge: "Nuevo",
        url: "Productos/Samsung/GalaxyS25_Fe.html"
    },
    {
        id: 3,
        marca: "samsung",
        categoria: "telefono",
        nombre: "Samsung Galaxy A57",
        precioOferta: "S/2200",
        precioAnterior: "S/2400",
        imagen: "Imagenes/samsung-galaxy-a57.jpg", 
        badge: "Nuevo",
        url: "Productos/Samsung/GalaxyA57.html"
    },
    {
        id: 4,
        marca: "samsung",
        categoria: "telefono",
        nombre: "Samsung Galaxy S26 Ultra",
        precioOferta: "S/4000",
        precioAnterior: "S/4500",
        imagen: "Imagenes/samsung-galaxy-s26-ultra-new.jpg", 
        badge: "Nuevo",
        url: "Productos/Samsung/GalaxyS26_Ultra.html"
    },
    
    // --- Iphone ---
    {
        id: 5,
        marca: "apple",
        categoria: "telefono",
        nombre: "Iphone 17 Pro Max",
        precioOferta: "S/5500",
        precioAnterior: "S/6000",
        imagen: "Imagenes/apple-iphone-17-pro-max.jpg", 
        badge: "Nuevo",
        url: "Productos/Apple/iPhone17_Pro_Max.html"
    },
    {
        id: 6,
        marca: "apple",
        categoria: "telefono",
        nombre: "Iphone 16",
        precioOferta: "S/4900",
        precioAnterior: "S/5200",
        imagen: "Imagenes/apple-iphone-16.jpg", 
        badge: "Nuevo",
        url: "Productos/Apple/iPhone16.html"
    },
    {
        id: 7,
        marca: "apple",
        categoria: "telefono",
        nombre: "Iphone 16 Pro Max",
        precioOferta: "S/3200",
        precioAnterior: "S/3500",
        imagen: "Imagenes/apple-iphone-16-pro-max.jpg",  
        badge: "Nuevo",
        url: "Productos/Apple/iPhone16_Pro_Max.html"
    },
    {
        id: 8,
        marca: "apple",
        categoria: "telefono",
        nombre: "Iphone 17e",
        precioOferta: "S/2700",
        precioAnterior: "S/2900",
        imagen: "Imagenes/apple-iphone-17e.jpg", 
        badge: "Nuevo",
        url: "Productos/Apple/iPhone17e.html"
    },
    
    // --- Xiomi ---
    {
        id: 9,
        marca: "xiaomi",
        categoria: "telefono",
        nombre: "Xiaomi 17",
        precioOferta: "S/2500",
        precioAnterior: "S/2700",
        imagen: "Imagenes/xiaomi-17.jpg", 
        badge: "Nuevo",
        url: "Productos/Xiaomi/Xiaomi17.html"
    },
    {
        id: 10,
        marca: "xiaomi",
        categoria: "telefono",
        nombre: "Xiaomi Poc X8 Pro Max",
        precioOferta: "S/2000",
        precioAnterior: "S/2200",
        imagen: "Imagenes/xiaomi-poco-x8-pro-max.jpg", 
        badge: "Nuevo",
        url: "Productos/Xiaomi/XiaomiPocoX8_Pro_Max.html"
    },
    {
        id: 11,
        marca: "xiaomi",
        categoria: "telefono",
        nombre: "Xiaomi Redmi 15",
        precioOferta: "S/1700",
        precioAnterior: "S/1900",
        imagen: "Imagenes/xiaomi-redmi-15a.jpg", 
        badge: "Nuevo",
        url: "Productos/Xiaomi/XiaomiRedmi15a.html"
    },
    {
        id: 12,
        marca: "xiaomi",
        categoria: "telefono",
        nombre: "Xiaomi Redmi R70",
        precioOferta: "S/2700",
        precioAnterior: "S/2900",
        imagen: "Imagenes/xiaomi-redmi-r70.jpg", 
        badge: "Nuevo",
        url: "Productos/Xiaomi/XiaomiRedmiR70.html"
    },
    
    // --- Macbooks ---
    {
        id: 13,
        marca: "apple",
        categoria: "laptop",
        nombre: "MacBook Air 13 Chip M5",
        precioOferta: "S/4500",
        precioAnterior: "S/5500",
        imagen: "Productos/MacBook/mba_13_15_e733a3435.jpg",
        badge: "Nuevo",
        url: "Productos/Macbook/MBA13.html"
    },
    {
        id: 14,
        marca: "apple",
        categoria: "laptop",
        nombre: "MacBook Pro 14 Chip M5",
        precioOferta: "S/8500",
        precioAnterior: "S/9500",
        imagen: "Productos/MacBook/Macbook Pro 14.jpg",
        badge: "Nuevo",
        url: "Productos/Macbook/MBP14.html"
    },
    {
        id: 15,
        marca: "apple",
        categoria: "laptop",
        nombre: "MacBook Neo",
        precioOferta: "S/4500",
        precioAnterior: "S/5500",
        imagen: "Productos/MacBook/Macbook neo.jpg",
        badge: "Nuevo",
        url: "Productos/Macbook/MBN.html"
    },
    {
        id: 16,
        marca: "apple",
        categoria: "laptop",
        nombre: "Mac mini M4",
        precioOferta: "S/3500",
        precioAnterior: "S/4000",
        imagen: "Productos/MacBook/Mac mini.jpg",
        badge: "Nuevo",
        url: "Productos/Macbook/MM.html"
    },
    
    
    // --- Laptops Asus ---
    {
        id: 17,
        marca: "asus",
        categoria: "laptop",
        nombre: "Asus Zenbook A16",
        precioOferta: "S/8099",
        precioAnterior: "S/8699",
        imagen: "Productos/Laptop Asus/Asus Zenbook",
        badge: "Nuevo",
        url: "Productos/Laptop Asus/AZA16.html"
    },
    {
        id: 18,
        marca: "asus",
        categoria: "laptop",
        nombre: "Asus Zenbook Duo(2025)",
        precioOferta: "S/7249",
        precioAnterior: "S/7999",
        imagen: "Productos/Laptop Asus/Asus Zenbook Duo(2025)",
        badge: "Nuevo",
        url: "Productos/Laptop Asus/AZD.html"
    },
    {
        id: 19,
        marca: "asus",
        categoria: "laptop",
        nombre: "Asus Zenbook A14",
        precioOferta: "S/4999",
        precioAnterior: "S/5299",
        imagen: "Productos/Laptop Asus/Asus Zenbook A14",
        badge: "Nuevo",
        url: "Productos/Laptop Asus/AZA14.html"
    },
    {
        id: 20,
        marca: "asus",
        categoria: "laptop",
        nombre: "Asus Zenbook 14 OLED",
        precioOferta: "S/4599",
        precioAnterior: "S/4899",
        imagen: "Productos/Laptop Asus/Asus Zenbook 14 OLED",
        badge: "Nuevo",
        url: "Productos/Laptop Asus/AZ14O.html"
    },
    
    // --- Ipad ---
    {
        id: 21,
        marca: "apple",
        categoria: "tablet",
        nombre: "Ipad Pro 11",
        precioOferta: "S/3999",
        precioAnterior: "S/4499",
        imagen: "Productos/Ipad/ipad_pro_81ecf8e96.png",
        badge: "Nuevo",
        url: "Productos/Ipad/IP11.html"
    },
    {
        id: 22,
        marca: "apple",
        categoria: "tablet",
        nombre: "Ipad Air 11",
        precioOferta: "S/1699",
        precioAnterior: "S/2180",
        imagen: "Productos/Ipad/ipad_air_3ea0d76a9.png",
        badge: "Nuevo",
        url: "Productos/Ipad/IA11.html"
    },
    {
        id: 23,
        marca: "apple",
        categoria: "tablet",
        nombre: "Ipad 11",
        precioOferta: "S/1529",
        precioAnterior: "S/1749",
        imagen: "Productos/Ipad/ipad_7300b7e87.png",
        badge: "Nuevo",
        url: "Productos/Ipad/I11.html"
    },
    
    {
        id: 24,
        marca: "apple",
        categoria: "tablet",
        nombre: "Ipad mini 6",
        precioOferta: "S/1899",
        precioAnterior: "S/2499",
        imagen: "Productos/Ipad/ipad_mini_1101012a6.png",
        badge: "Nuevo",
        url: "Productos/Ipad/IM6.html"
    },
    
    // --- Tablet samsung ---
    {
        id: 25,
        marca: "samsung",
        categoria: "tablet",
        nombre: "Galaxy Tab S11 Ultra",
        precioOferta: "S/7699",
        precioAnterior: "S/7799",
        imagen: "Productos/Tablet Samsung/Galaxy tab s11 Ultra",
        badge: "Nuevo",
        url: "Productos/Tablet Samsung/GT11U.html"
    },
    {
        id: 26,
        marca: "samsung",
        categoria: "tablet",
        nombre: "Galaxy Tab S11",
        precioOferta: "S/4699",
        precioAnterior: "S/5099",
        imagen: "Productos/Tablet Samsung/Galaxy Tab s11",
        badge: "Nuevo",
        url: "Productos/Tablet Samsung/GT11.html"
    },
    {
        id: 27,
        marca: "samsung",
        categoria: "tablet",
        nombre: "Galaxy Tab S10 FE plus",
        precioOferta: "S/3299",
        precioAnterior: "S/3499",
        imagen: "Productos/Tablet Samsung/Galaxy Tab s10 fe plus",
        badge: "Nuevo",
        url: "Productos/Tablet Samsung/GT10FEP.html"
    },
    {
        id: 28,
        marca: "samsung",
        categoria: "tablet",
        nombre: "Galaxy Tab S10 FE",
        precioOferta: "S/2499",
        precioAnterior: "S/2749",
        imagen: "Productos/Tablet Samsung/Galaxy tab S10 Fe",
        badge: "Nuevo",
        url: "Productos/Tablet Samsung/GT10FE.html"
    },
    
    // --- Accesorios - cargadores ---
    {
        id: 29,
        marca: "apple",
        categoria: "cargador",
        nombre: "Cargador Apple 30W",
        precioOferta: "S/180",
        precioAnterior: "S/220",
        imagen: "Productos/Cargadores/cargador apple 30w.jpeg",
        badge: "Nuevo",
        url: "Productos/Cargadores/A30W.html"
    },
    {
        id: 30,
        marca: "samsung",
        categoria: "cargador",
        nombre: "Cargador Samsung 45W",
        precioOferta: "S/150",
        precioAnterior: "S/190",
        imagen: "Productos/Cargadores/cargador samsung 40w.jpg",
        badge: "Nuevo",
        url: "Productos/Cargadores/S45W.html"
    },
    {
        id: 31,
        marca: "xiaomi",
        categoria: "cargador",
        nombre: "Cargador Xiomi 120W",
        precioOferta: "S/130",
        precioAnterior: "S/170",
        imagen: "Productos/Cargadores/cargador xiaomi 120w.jpeg",
        badge: "Nuevo",
        url: "Productos/Cargadores/X120W.html"
    },
    
    // --- Accesorios - Audifonos ---
    {
        id: 32,
        marca: "apple",
        categoria: "audifonos",
        nombre: "AirPods Pro 3",
        precioOferta: "S/950",
        precioAnterior: "S/1110",
        imagen: "Productos/Audífonos/airpods3.jpeg",
        badge: "Nuevo",
        url: "Productos/Audífonos/AP3.html"
    },
    {
        id: 33,
        marca: "samsung",
        categoria: "audifonos",
        nombre: "Samsung Galaxy Buds 3",
        precioOferta: "S/650",
        precioAnterior: "S/780",
        imagen: "Productos/Audífonos/galaxy buds 3.jpeg",
        badge: "Nuevo",
        url: "Productos/Audífonos/SGB3.html"
    },
    {
        id: 34,
        marca: "xiaomi",
        categoria: "audifonos",
        nombre: "Redmi Buds 6",
        precioOferta: "S/250",
        precioAnterior: "S/320",
        imagen: "Productos/Audífonos/redmi buds 6.jpeg",
        badge: "Nuevo",
        url: "Productos/Audífonos/RB6.html"
    },
    // --- Accesorios - Smartwatch---
    {
        id: 35,
        marca: "apple",
        categoria: "smartwatch",
        nombre: "Apple Watch Series 11",
        precioOferta: "S/2200",
        precioAnterior: "S/2500",
        imagen: "Productos/Smartwatch/apple wach series 11.jpeg",
        badge: "Nuevo",
        url: "Productos/Smartwatch/AWS11.html"
    },
    {
        id: 36,
        marca: "samsung",
        categoria: "smartwatch",
        nombre: "Samsung Galaxy Watch 8",
        precioOferta: "S/1500",
        precioAnterior: "S/1800",
        imagen: "Productos/Smartwatch/galaxy watch 8.jpeg",
        badge: "Nuevo",
        url: "Productos/Smartwatch/SGW8.html"
    },
    {
        id: 37,
        marca: "xiaomi",
        categoria: "smartwatch",
        nombre: "Redmi Watch 6",
        precioOferta: "S/550",
        precioAnterior: "S/700",
        imagen: "Productos/Smartwatch/redmi watch 6.jpeg",
        badge: "Nuevo",
        url: "Productos/Smartwatch/RW6.html"
    },
    
    // --- Fundas y Protectores---
    {
        id: 38,
        marca: "apple",
        categoria: "fundas",
        nombre: "Funda Transparente iPhone",
        precioOferta: "S/60",
        precioAnterior: "S/80",
        imagen: "Productos/Fundas y protectores/funda transparente iphone.jpeg",
        badge: "Nuevo",
        url: "Productos/Fundas y protectores/FTIP.html"
    },
    {
        id: 39,
        marca: "samsung",
        categoria: "fundas",
        nombre: "Funda Antigolpes Samsung",
        precioOferta: "S/60",
        precioAnterior: "S/80",
        imagen: "Productos/Fundas y protectores/funda antigolpes samsung.jpeg",
        badge: "Nuevo",
        url: "Productos/Fundas y protectores/FAS.html"
    },
    {
        id: 40,
        marca: "generico",
        categoria: "fundas",
        nombre: "Protector de Pantalla 9H",
        precioOferta: "S/60",
        precioAnterior: "S/80",
        imagen: "Productos/Fundas y protectores/protector de pantalla 9h.jpeg",
        badge: "Nuevo",
        url: "Productos/Fundas y protectores/PP9.html"
    },
    // --- Reacondicionados---
    {
        id: 41,
        marca: "apple",
        categoria: "reacondicionados",
        nombre: "Iphone 14 Pro 128GB Reacondicionado",
        precioOferta: "S/2099",
        precioAnterior: "S/2469",
        imagen: "Productos/Iphone-reacondicionado/Iphone 12 Pro",
        badge: "Nuevo",
        url: "Productos/Iphone-reacondicionado/I14P.html"
    },
    {
        id: 42,
        marca: "apple",
        categoria: "reacondicionados",
        nombre: "Iphone 15 128GB Reacondicionado",
        precioOferta: "S/1899",
        precioAnterior: "S/2099",
        imagen: "Productos/Iphone-reacondicionado/Iphone 13 Reaconcionado",
        badge: "Nuevo",
        url: "Productos/Iphone-reacondicionado/I15.html"
    },
    {
        id: 43,
        marca: "apple",
        categoria: "reacondicionados",
        nombre: "Iphone 13 Rosado 128GB Reacondicionado",
        precioOferta: "S/1499",
        precioAnterior: "S/1799",
        imagen: "Productos/Iphone-reacondicionado/Iphone 13 rosado",
        badge: "Nuevo",
        url: "Productos/Iphone-reacondicionado/I13.html"
    },
    {
        id: 44,
        marca: "apple",
        categoria: "reacondicionados",
        nombre: "Iphone 12 Pro Negro 128GB Reacondicionado",
        precioOferta: "S/1199",
        precioAnterior: "S/1699",
        imagen: "Productos/Iphone-reacondicionado/Iphone 12 Pro Negro",
        badge: "Nuevo",
        url: "Productos/Iphone-reacondicionado/I12P.html"
    }
    
];
