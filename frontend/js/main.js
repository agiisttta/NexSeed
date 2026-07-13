/* =====================================================
   MAIN.JS
   Digunakan di semua halaman
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    console.log("Website Simulasi Perkecambahan berhasil dimuat.");

    activeNavbar();

    smoothScroll();

    buttonEffect();

    fadeAnimation();

});

// Active navbar

function activeNavbar(){

    const links = document.querySelectorAll("nav ul li a");

    const current = window.location.pathname.split("/").pop();

    links.forEach(link=>{

        const page = link.getAttribute("href");

        if(page===current){

            link.parentElement.classList.add("active");

        }

    });

}

// Button effect

function buttonEffect(){

    const buttons=document.querySelectorAll("button");

    buttons.forEach(button=>{

        button.addEventListener("mousedown",()=>{

            button.style.transform="scale(.95)";

        });

        button.addEventListener("mouseup",()=>{

            button.style.transform="scale(1)";

        });

        button.addEventListener("mouseleave",()=>{

            button.style.transform="scale(1)";

        });

    });

}

// Smooth scroll

function smoothScroll(){

    const links=document.querySelectorAll('a[href^="#"]');

    links.forEach(anchor=>{

        anchor.addEventListener("click",function(e){

            e.preventDefault();

            const target=document.querySelector(this.getAttribute("href"));

            if(target){

                target.scrollIntoView({

                    behavior:"smooth"

                });

            }

        });

    });

}

// Fade animation

function fadeAnimation(){

    const elements=document.querySelectorAll(

        ".card,.quiz-card,.info-card,.progress-card,.question,.simulation-card,.lkpd-card"

    );

    const observer=new IntersectionObserver((entries)=>{

        entries.forEach(entry=>{

            if(entry.isIntersecting){

                entry.target.style.opacity="1";

                entry.target.style.transform="translateY(0px)";
                
                // Hentikan observasi setelah elemen muncul agar tidak bentrok
                observer.unobserve(entry.target);

            }

        });

    },{

        // Ubah threshold menjadi sangat kecil agar elemen besar tetap bisa memicu animasi
        threshold: 0.02

    });

    elements.forEach(el=>{

        el.style.opacity="0";

        el.style.transform="translateY(40px)";

        el.style.transition=".6s ease-out";

        observer.observe(el);

    });

}

// Toast

function showToast(message,color="#2E7D32"){

    const toast=document.createElement("div");

    toast.innerText=message;

    toast.style.position="fixed";

    toast.style.top="30px";

    toast.style.right="30px";

    toast.style.padding="15px 25px";

    toast.style.background=color;

    toast.style.color="#fff";

    toast.style.borderRadius="12px";

    toast.style.fontWeight="600";

    toast.style.boxShadow="0 8px 20px rgba(0,0,0,.2)";

    toast.style.zIndex="9999";

    toast.style.opacity="0";

    toast.style.transition=".4s";

    document.body.appendChild(toast);

    setTimeout(()=>{

        toast.style.opacity="1";

    },100);

    setTimeout(()=>{

        toast.style.opacity="0";

    },2800);

    setTimeout(()=>{

        toast.remove();

    },3300);

}

// Loading

function showLoading(){

    const loading=document.createElement("div");

    loading.id="loading";

    loading.innerHTML=`

    <div class="loading-box">

        <div class="spinner"></div>

        <p>Memuat...</p>

    </div>

    `;

    loading.style.position="fixed";

    loading.style.left="0";

    loading.style.top="0";

    loading.style.width="100%";

    loading.style.height="100%";

    loading.style.background="rgba(255,255,255,.8)";

    loading.style.display="flex";

    loading.style.justifyContent="center";

    loading.style.alignItems="center";

    loading.style.zIndex="99999";

    document.body.appendChild(loading);

}

function hideLoading(){

    const loading=document.getElementById("loading");

    if(loading){

        loading.remove();

    }

}

// Back to top

const topButton=document.createElement("button");

topButton.innerHTML="↑";

topButton.id="topButton";

topButton.style.position="fixed";

topButton.style.right="25px";

topButton.style.bottom="25px";

topButton.style.width="50px";

topButton.style.height="50px";

topButton.style.borderRadius="50%";

topButton.style.border="none";

topButton.style.background="#2E7D32";

topButton.style.color="#fff";

topButton.style.fontSize="20px";

topButton.style.cursor="pointer";

topButton.style.display="none";

topButton.style.boxShadow="0 8px 20px rgba(0,0,0,.2)";

document.body.appendChild(topButton);

window.addEventListener("scroll",()=>{

    if(window.scrollY>300){

        topButton.style.display="block";

    }

    else{

        topButton.style.display="none";

    }

});

topButton.onclick=()=>{

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

};

