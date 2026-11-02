
/* Projects page: data, filters, search, counters */
(function(){

var D=[
{k:'apps',t:'Web & desktop apps',c:['#f2650f','#6a1f05'],i:[
['POS','Desktop app','Point-of-sale software.','assets/projects/POS.jpg','https://github.com/echocrypter/Naeem-Mobile-POS'],
['LeadHawk','Desktop app','Lead capturing.','assets/projects/leadh.jpg'],
['Habitly','Web app','Habit tracking.','assets/projects/habitly.jpg','https://habitly-three-blue.vercel.app/'],
['FinTrack','Web app','Finance tracking.','assets/projects/fintrack.jpg','https://v0-fintrack-hammadapp.vercel.app/'],
['Mini Jarvis','App','AI assistant app.','assets/projects/jarvis.jpg','https://jarvis-theta-peach.vercel.app/']
]},

{k:'web',t:'Websites',c:['#e0701a','#7a2406'],i:[
['Dr Arshad Riaz','Portfolio','Personal portfolio website.','assets/projects/dr.jpg','https://drarshadriazportfolio.vercel.app/'],
['Anwaar','Portfolio','Personal portfolio website.','assets/projects/anwaar.jpg','https://anwaarportfolio.vercel.app/'],
['Aleem','Portfolio','Personal portfolio website.','assets/projects/aleem.jpg','https://aleemportfolio.vercel.app/'],
['Hammad Ahmad','Portfolio','My own portfolio website.','assets/projects/mady.jpg','https://hammadahmadportfolio.netlify.app/'],
['Air Khushab','Airline','Airline website.','assets/projects/air.jpg','https://air-khushab.vercel.app'],
['Naeem','Mobile','Mobile website.','assets/projects/naeem.jpg','https://naeem-mobile.vercel.app/'],
['The Education Consultant','Education','Educational consultancy website.','assets/projects/tec.jpg','https://theeducationconsultant.vercel.app/'],
['Khamis','E-commerce','E-commerce store.','assets/projects/khamis.jpg','https://khamis-mu.vercel.app/'],
['Lucci','Clone','A clone of Gucci.','assets/projects/lucci.jpg','https://lucci-nine.vercel.app/'],
['Murphy Dental','Healthcare','Dental clinic website.','assets/projects/murphy.jpg','https://murphy-dental.vercel.app/'],
['Herman Cafe','Cafe','Cafe website.','assets/projects/herman.jpg','https://herman-cafe.vercel.app/'],
['Khayam Cinema','Cinema','Cinema website.','assets/projects/khayam.jpg','https://khayam-cinema.vercel.app/'],
['Hammond VR','VR','VR website.','assets/projects/vr.jpg','https://hammond-vr.vercel.app/'],
['Planetopedia','Website','','assets/projects/planet.jpg','https://planetopedia-eight.vercel.app/'],
['Nexora','Login page','Login page design.','assets/projects/nexora.jpg','https://nexora-login-page.vercel.app/'],
['Adaab Auth','Auth','Authentication pages.','assets/projects/adaab.jpg','https://adaab-auth-panel.vercel.app/'],
['NXR','Landing page','Landing page.','assets/projects/nxr.jpg','https://invoicely-sooty-eight.vercel.app/']
]},

{k:'ai',t:'AI automation & agents',c:['#d63a2f','#3f0d14'],i:[
['Customer service agent','AI agent','Handles customer service conversations.','assets/projects/cs.jpeg'],
['Lead generation agent','AI agent','Finds and qualifies leads.','assets/projects/lg.jpeg'],
['RAG query agent','RAG agent','Answers questions from your own documents.','assets/projects/rqb.jpeg'],
['SEO agent','AI agent · MVP','SEO assistant, built as an MVP.','assets/projects/seo.jpeg'],
['YouTube transcript & blog agent','AI agent','Turns YouTube transcripts into blog posts and posts them.','assets/projects/blog.jpeg'],
['Invoice processing agent','AI agent','Reads invoices and extracts the data.','assets/projects/ip.jpeg'],
['WhatsApp chatbot','Chatbot','Chats with customers on WhatsApp.','assets/projects/wa.jpg'],
['Voice receptionist','Voice agent','Answers calls like a receptionist.','assets/projects/reception.jpeg'],
['AI customer service','Voice agent','Handles customer service calls.','assets/projects/csvoice.jpeg'],
['Inventory management agent','AI agent','Helps manage stock and inventory.','assets/projects/ip.jpeg']
]}
];

var total=0;

D.forEach(function(g){
    total+=g.i.length;
});

var list=document.getElementById('list'),
    fl=document.getElementById('fl'),
    q=document.getElementById('q');

var pad=function(n){
    return n<10?'0'+n:''+n;
};

function ini(s){
    var w=s.replace(/[^A-Za-z ]/g,'').split(' ').filter(Boolean);
    return (w.length>1?w[0][0]+w[1][0]:w[0].slice(0,2)).toUpperCase();
}

D.forEach(function(g){

    var sec=document.createElement('section');

    sec.className='cat';
    sec.dataset.k=g.k;

    var h='<div class="cat-h"><h2>'+g.t+'</h2><span class="n"><b>'+g.i.length+'+</b> projects</span></div><div class="grid">';

    g.i.forEach(function(p,i){

        var image=p[3] || '';
        var url=p[4] || '';

        h+='<article class="card" style="--c1:'+g.c[0]+';--c2:'+g.c[1]+'" data-s="'+(p[0]+' '+p[1]+' '+p[2]).toLowerCase()+'"'+(url?' data-url="'+url+'" tabindex="0" role="link"':'')+'>';

        h+='<div class="cv" data-i="'+ini(p[0])+'">';

        if(image){
            h+='<img class="project-img" src="'+image+'" alt="'+p[0]+'" loading="lazy">';
        }

        h+='<span class="tag">'+p[1]+'</span>';

        h+='<span class="no">'+pad(i+1)+'</span>';

        h+='</div>';

        h+='<div class="bd">';

        h+='<h3>'+p[0]+'</h3>';

        if(p[2]){
            h+='<p>'+p[2]+'</p>';
        }

        if(url){
            h+='<span class="visit">Open project ↗</span>';
        }

        h+='</div>';

        h+='</article>';
    });

    sec.innerHTML=h+'</div>';

    list.appendChild(sec);

    /* Make linked project cards clickable */
    sec.querySelectorAll('.card[data-url]').forEach(function(card){

        function openProject(){
            window.open(card.dataset.url,'_blank','noopener,noreferrer');
        }

        card.addEventListener('click',function(){
            openProject();
        });

        card.addEventListener('keydown',function(e){
            if(e.key==='Enter' || e.key===' '){
                e.preventDefault();
                openProject();
            }
        });

    });

});

var empty=document.createElement('p');

empty.className='empty';
empty.textContent='No projects match your search.';
empty.hidden=true;

list.appendChild(empty);

var cat='all';

function apply(){

    var term=q.value.trim().toLowerCase(),
        shown=0;

    list.querySelectorAll('.cat').forEach(function(s){

        var okc=cat==='all'||s.dataset.k===cat,
            any=0;

        s.querySelectorAll('.card').forEach(function(c){

            var ok=okc&&(!term||c.dataset.s.indexOf(term)>-1);

            c.hidden=!ok;

            if(ok){
                any++;
            }
        });

        s.hidden=!any;

        shown+=any;
    });

    empty.hidden=shown>0;
}

[['all','All',total]]
.concat(
    D.map(function(g){
        return [g.k,g.t,g.i.length];
    })
)
.forEach(function(f,i){

    var b=document.createElement('button');

    b.type='button';

    b.setAttribute(
        'aria-pressed',
        i===0?'true':'false'
    );

    b.innerHTML=f[1]+'<b>'+f[2]+'+</b>';

    b.onclick=function(){

        cat=f[0];

        fl.querySelectorAll('button').forEach(function(x){

            x.setAttribute(
                'aria-pressed',
                x===b?'true':'false'
            );

        });

        apply();
    };

    fl.appendChild(b);
});

q.addEventListener('input',apply);

var reduce=window.matchMedia(
    '(prefers-reduced-motion: reduce)'
).matches;

var T={
    't-all':total,
    't-apps':D[0].i.length,
    't-web':D[1].i.length,
    't-ai':D[2].i.length
};

Object.keys(T).forEach(function(id){

    var el=document.getElementById(id),
        n=T[id];

    el.textContent=n+'+';

    if(reduce){
        return;
    }

    var t0=null;

    function f(t){

        if(!t0){
            t0=t;
        }

        var p=Math.min(
            (t-t0)/1200,
            1
        );

        var e=1-Math.pow(
            1-p,
            3
        );

        el.textContent=Math.round(n*e)+'+';

        if(p<1){
            requestAnimationFrame(f);
        }
    }

    el.textContent='0+';

    requestAnimationFrame(f);
});

document.getElementById('yr').textContent=
    new Date().getFullYear();

})();
