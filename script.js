/* PROJECT A.L. — conteúdo personalizável e interações locais */
const CONFIG = {
  guest: 'Ana Lívia', host: 'Kauan',
  portals: {
    spider: 'Com grandes poderes vêm grandes responsabilidades. E uma delas pode ser escolher um lugar legal pra gente sair. O amigão da vizinhança pode cuidar das teias desta vez.',
    stark: 'Analisei milhares de possibilidades. Meu sistema concluiu que fazer esse convite pessoalmente seria uma boa ideia. Assinado: Kauan Stark. J.A.R.V.I.S. confirma.',
    strange: 'Em milhões de futuros possíveis, encontrei uma possibilidade que me deixou curioso: nós dois saindo juntos. O Manto da Levitação também aprovou.',
    avengers: 'Até os Vingadores precisam de uma pausa entre uma missão e outra. Que tal a gente ter a nossa? Sem batalha em Wakanda nem portal com Thanos, combinado?'
  }
};
const $ = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => [...root.querySelectorAll(s)];
const intro = $('#intro'), progress = $('#progress'), bootLines = $$('#boot-lines p');
let bootTimer, bootStep=0, explored=new Set(), starkClicks=0, toastTimer, audioContext, audioOn=false, ambientNodes=[];
const messages = {
  stark: ['PROTOCOLO STARK DESBLOQUEADO.', 'Tony Stark provavelmente faria uma apresentação de 40 slides, com hologramas e uma armadura pronta na garagem. O Kauan preferiu construir um site inteiro.', 'Se isso não for dedicação, não sei o que é.'].join('\n\n'),
  strange: 'Consultei 14.000.605 possibilidades...\n\nEm algumas delas, você está rindo deste site. Vou considerar isso um bom começo. Wong já pode fechar o portal.',
  artifact: 'Se você chegou até aqui, parabéns. Você desbloqueou o nível secreto da missão.\n\nRecompensa: um convite feito com carinho e um desenvolvedor que realmente se dedicou a isso. Até o Rocket respeitaria esse saque.'
};
function showToast(text){const t=$('#toast');t.textContent=text;t.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>t.classList.remove('show'),2800)}
function runBoot(){clearInterval(bootTimer);bootStep=0;progress.style.width='0%';bootLines.forEach(x=>x.classList.remove('visible'));bootTimer=setInterval(()=>{if(bootStep<bootLines.length){bootLines[bootStep].classList.add('visible');progress.style.width=`${((bootStep+1)/bootLines.length)*100}%`;bootStep++}else{clearInterval(bootTimer);setTimeout(()=>$('#intro-reveal').classList.add('show'),230)}},470)}
function skipBoot(){clearInterval(bootTimer);bootLines.forEach(x=>x.classList.add('visible'));progress.style.width='100%';$('#intro-reveal').classList.add('show')}
runBoot();$('#skip-intro').addEventListener('click',skipBoot);
function go(id){$$('.scene').forEach(s=>{s.classList.remove('active');s.setAttribute('aria-hidden','true')});const target=$(`#${id}`);target.classList.add('active');target.removeAttribute('aria-hidden');window.scrollTo({top:0,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});if(id==='final'){ $('#more-view').hidden=true;$('#success-view').hidden=true;$('.final-content').hidden=false;}}
$$('[data-go]').forEach(b=>b.addEventListener('click',()=>go(b.dataset.go)));
$$('.portal-card').forEach(card=>card.addEventListener('click',()=>{const key=card.dataset.portal;const was=card.classList.contains('open');card.classList.toggle('open');card.querySelector('.portal-message').textContent=was?'':CONFIG.portals[key];if(!was)explored.add(key);if(explored.size===4){$('#portal-next').disabled=false;$('#portal-nudge').textContent='Todos os portais explorados. Uma nova possibilidade aguarda.'}}));
function openModal(kicker,title,text){$('#modal-kicker').textContent=kicker;$('#modal-title').textContent=title;$('#modal-text').textContent=text;$('#modal').hidden=false;$('#modal-close').focus()}
function closeModal(){$('#modal').hidden=true}
$('#modal-close').addEventListener('click',closeModal);$('#modal-ok').addEventListener('click',closeModal);$('#modal').addEventListener('click',e=>{if(e.target===$('#modal'))closeModal()});document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal()});
const reactor=$('#reactor');function countStark(){starkClicks++;reactor.classList.add('clicked');setTimeout(()=>reactor.classList.remove('clicked'),180);if(starkClicks===5){openModal('PROTOCOLO ESPECIAL','PROTOCOLO STARK DESBLOQUEADO.',messages.stark);starkClicks=0}}reactor.addEventListener('click',countStark);reactor.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();countStark()}});
$('#mystic-symbol').addEventListener('click',e=>{e.stopPropagation();const card=e.currentTarget.closest('.portal-card');if(!card.classList.contains('open'))card.click();openModal('VISÃO TEMPORAL // DOUTOR ESTRANHO','14.000.605 possibilidades',messages.strange)});
$('#artifact').addEventListener('click',()=>openModal('ARTEFATO CÓSMICO DESCOBERTO','NÍVEL SECRETO DA MISSÃO',messages.artifact));
$('#more').addEventListener('click',()=>{$('.final-content').hidden=true;$('#success-view').hidden=true;$('#more-view').hidden=false;$('#more-view').scrollIntoView({behavior:'smooth',block:'center'})});
$$('[data-back]').forEach(b=>b.addEventListener('click',()=>{$('#more-view').hidden=true;$('.final-content').hidden=false;$('.final-content').scrollIntoView({behavior:'smooth',block:'center'})}));
$('#accept').addEventListener('click',()=>{$('.final-content').hidden=true;$('#more-view').hidden=true;$('#success-view').hidden=false;$('#success-view').scrollIntoView({behavior:'smooth',block:'center'});celebrate()});
function celebrate(){for(let i=0;i<24;i++){const p=document.createElement('i');p.className='confetti';p.setAttribute('aria-hidden','true');p.style.cssText=`position:fixed;z-index:10;left:${Math.random()*100}vw;top:-12px;width:${4+Math.random()*5}px;height:${6+Math.random()*9}px;background:${['#39bfff','#efc77b','#f04466','#8b5cf6'][i%4]};border-radius:2px;pointer-events:none;transition:transform ${1.5+Math.random()*1.2}s ease-out,opacity 2.3s`;document.body.appendChild(p);requestAnimationFrame(()=>{p.style.transform=`translate(${(Math.random()-.5)*180}px,${window.innerHeight+50}px) rotate(${Math.random()*620}deg)`;p.style.opacity='0'});setTimeout(()=>p.remove(),2700)}}
// Som sintético opcional: só inicia após ação explícita da visitante.
$('.sound-toggle').addEventListener('click',async e=>{audioOn=!audioOn;const b=e.currentTarget;b.setAttribute('aria-pressed',String(audioOn));b.querySelector('span').textContent=audioOn?'ON':'OFF';try{audioContext ||= new (window.AudioContext||window.webkitAudioContext)();if(audioContext.state==='suspended')await audioContext.resume();if(audioOn){const mix=audioContext.createGain();mix.gain.value=.012;mix.connect(audioContext.destination);ambientNodes=[mix];[130.81,196].forEach((freq,index)=>{const osc=audioContext.createOscillator(),gain=audioContext.createGain();osc.type='sine';osc.frequency.value=freq;gain.gain.value=index?.22:.42;osc.connect(gain);gain.connect(mix);osc.start();ambientNodes.push(osc,gain)});}else{ambientNodes.forEach(n=>{try{if(n.stop)n.stop()}catch{}try{n.disconnect()}catch{}});ambientNodes=[]}}catch{audioOn=false;b.setAttribute('aria-pressed','false');b.querySelector('span').textContent='OFF';showToast('Áudio indisponível neste navegador.')}});
