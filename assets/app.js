// Extracted from inline page scripts; execution order preserved.

(function(){const root=document.getElementById('maker-paths-section');if(!root)return;const detail=document.getElementById('maker-path-detail');const data={create:['01 / 创作到上线','从创作到上线，一步到位','TapTap制造不只是帮你把游戏做出来，还把发布、商店页和后续运营连接起来。'],migrate:['02 / 迁移作品','把已有作品带到 Maker','支持从 Phaser、HTML5、JavaScript 等项目出发，先迁移核心玩法，再逐步适配素材、界面和交互。'],star:['03 / 新星计划','给优质开发者更多支持','面向完成度较高、持续产出优质内容的开发者，提供积分、曝光、实习和合作机会。']};root.querySelectorAll('.maker-path').forEach(btn=>btn.addEventListener('click',()=>{root.querySelectorAll('.maker-path').forEach(x=>{x.classList.remove('is-active');x.setAttribute('aria-selected','false')});btn.classList.add('is-active');btn.setAttribute('aria-selected','true');const d=data[btn.dataset.path];detail.innerHTML='<p class="text-xs font-mono tracking-[0.2em] text-[#00D9C5]">'+d[0]+'</p><h3 class="mt-3 text-2xl md:text-3xl font-bold text-white">'+d[1]+'</h3><p class="mt-3 max-w-3xl text-sm md:text-base leading-relaxed text-gray-300">'+d[2]+'</p>';}))})();

(function(){const r=document.getElementById('maker-paths-zk');if(!r)return;const d={create:['01 / 创作到上线','从创作到上线，一步到位','TapTap制造不只是帮你把游戏做出来，还把发布、商店页和后续运营连接起来。','创作 → 构建 → 商店页 → 上线','↗'],migrate:['02 / 迁移作品','把已有作品带到 Maker','支持从 Phaser、HTML5、JavaScript 等项目出发，先迁移核心玩法，再逐步适配素材、界面和交互。','已有作品 → 迁移核心玩法 → Maker 运行','↗'],star:['03 / 新星计划','给优质开发者更多支持','面向完成度较高、持续产出优质内容的开发者，提供积分、曝光、实习和合作机会。','作品评估 → 扶持资源 → 更多机会','✦']};const e=['kicker','title','copy','note','mark'].map(x=>document.getElementById('zk-'+x));r.querySelectorAll('.zk-tab').forEach(b=>b.addEventListener('click',()=>{r.querySelectorAll('.zk-tab').forEach(x=>{x.classList.remove('active');x.setAttribute('aria-selected','false')});b.classList.add('active');b.setAttribute('aria-selected','true');const x=d[b.dataset.zk];e.forEach((n,i)=>n.textContent=x[i]);const c=[e[0],e[1],e[2],e[3],e[4]];c.forEach(n=>{n.getAnimations().forEach(a=>a.cancel());n.animate([{opacity:.2,transform:'translateY(12px)'},{opacity:1,transform:'translateY(0)'}],{duration:450,easing:'cubic-bezier(.2,.7,.2,1)',fill:'both'});});}));})();

(function(){const s=document.getElementById('maker-paths-zk');if(!s||!window.gsap||!window.ScrollTrigger)return;const reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;if(reduce)return;s.classList.add('zk-motion-ready');gsap.registerPlugin(ScrollTrigger);const tabs=s.querySelectorAll('.zk-tab'),panel=s.querySelector('.zk-panel'),head=s.querySelector('h2'),lead=s.querySelector(':scope > .max-w-6xl > p:nth-of-type(2)'),tag=s.querySelector(':scope > .max-w-6xl > p:first-child');const intro=gsap.timeline({paused:true});intro.fromTo(tag,{y:12,opacity:0},{y:0,opacity:1,duration:.6,ease:'power2.out'}).fromTo(head,{y:45,opacity:0,clipPath:'inset(100% 0 0 0)'},{y:0,opacity:1,clipPath:'inset(0% 0 0 0)',duration:.72,ease:'power3.out'},'-=.2').fromTo(lead,{x:-24,opacity:0},{x:0,opacity:1,duration:.5,ease:'power2.out'},'+=.2').fromTo(tabs,{y:60,opacity:0},{y:0,opacity:1,duration:.46,stagger:.12,ease:'power2.out'},'-.1').fromTo(panel,{y:18,opacity:0},{y:0,opacity:1,duration:.45,ease:'power2.out'},'-.2');ScrollTrigger.create({trigger:s,start:'top 78%',once:true,onEnter:()=>intro.play()});})();

/* ==================== 游戏图片加载策略 ====================
           有 src 的用本地真实图标（game-img/ 目录，抓自 TapTap 官方详情页 og:image），
           加载失败或没有 src 的回落到本地生成的 SVG 占位图（离线可用、支持中文）。 */
        (function() {
            function placeholderURI(text, w, h) {
                // 字号随标题长度自适应，保证长名字不溢出
                const fontSize = Math.round(Math.min(w * 0.8 / text.length, w * 0.12));
                const svg =
                    '<svg xmlns="http://www.w3.org/2000/svg" width="' + w + '" height="' + h + '">' +
                    '<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">' +
                    '<stop offset="0" stop-color="#013b3c"/>' +
                    '<stop offset="1" stop-color="#00D9C5"/>' +
                    '</linearGradient></defs>' +
                    '<rect width="100%" height="100%" fill="url(#g)"/>' +
                    '<rect width="100%" height="100%" fill="rgba(10,15,20,0.35)"/>' +
                    '<text x="50%" y="50%" font-family="PingFang SC, Microsoft YaHei, sans-serif" font-size="' + fontSize + '" font-weight="bold" fill="#ffffff" text-anchor="middle" dominant-baseline="central">' + text + '</text>' +
                    '</svg>';
                return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
            }
            document.querySelectorAll('img[data-ph]').forEach(img => {
                const [w, h] = (img.dataset.size || '400x400').split('x').map(Number);
                const fallback = () => {
                    img.onerror = null;
                    img.src = placeholderURI(img.dataset.ph, w, h);
                };
                if (img.getAttribute('src')) {
                    img.onerror = fallback;
                    // 脚本晚于图片加载时 error 事件已经错过，补一次状态检查
                    if (img.complete && img.naturalWidth === 0) fallback();
                } else {
                    fallback();
                }
            });
        })();

        /* ==================== Maker 制造同款底纹 + 鼠标光照层 ====================
           参考官网 bg-pattern.jpg 的元素（电路走线/像素手柄/脑神经网络/播放三角/像素飞船），
           用 SVG 重绘成深色低透明版平铺；高亮副本叠在上面，由径向 mask 跟随鼠标"点亮"。 */
        (function() {
            const TEAL = '%2300D9C5'; // url 编码后的 #00D9C5

            // 像素画：cells 为 [列,行] 数组，s 为单格边长
            function px(x, y, s, cells, op) {
                return '<g fill="' + TEAL + '" fill-opacity="' + op + '">' +
                    cells.map(c => '<rect x="' + (x + c[0] * s) + '" y="' + (y + c[1] * s) + '" width="' + s + '" height="' + s + '"/>').join('') +
                    '</g>';
            }
            // 像素手柄
            function gamepad(x, y, s, op) {
                return px(x, y, s, [
                    [1,0],[2,0],[5,0],[6,0],
                    [0,1],[1,1],[2,1],[3,1],[4,1],[5,1],[6,1],[7,1],
                    [0,2],[1,2],[3,2],[4,2],[6,2],[7,2],
                    [0,3],[1,3],[2,3],[5,3],[6,3],[7,3]
                ], op);
            }
            // 像素小飞船（致敬太空侵略者）
            function invader(x, y, s, op) {
                return px(x, y, s, [
                    [1,0],[5,0],[2,1],[4,1],[1,2],[2,2],[3,2],[4,2],[5,2],
                    [0,3],[1,3],[3,3],[5,3],[6,3],[0,4],[6,4],[2,5],[4,5]
                ], op);
            }
            // 脑神经网络：节点 + 连线
            function brain(x, y, op) {
                const n = [[0,40],[26,12],[60,0],[96,10],[120,36],[112,72],[80,92],[44,88],[14,68],[58,46]];
                const e = [[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,8],[8,0],[9,1],[9,3],[9,5],[9,7],[2,9],[4,9]];
                return '<g stroke="' + TEAL + '" stroke-opacity="' + op + '" stroke-width="1">' +
                    e.map(p => '<line x1="' + (x + n[p[0]][0]) + '" y1="' + (y + n[p[0]][1]) + '" x2="' + (x + n[p[1]][0]) + '" y2="' + (y + n[p[1]][1]) + '"/>').join('') +
                    '</g><g fill="' + TEAL + '" fill-opacity="' + (op * 1.4) + '">' +
                    n.map(p => '<circle cx="' + (x + p[0]) + '" cy="' + (y + p[1]) + '" r="2.5"/>').join('') +
                    '</g>';
            }
            // boost 为整体亮度倍率：底层 1 倍（隐约可见），光照层 3.5 倍（被照亮）
            function patternSVG(boost) {
                const t = (o) => Math.min(o * boost, 0.9);
                return '<svg xmlns="http://www.w3.org/2000/svg" width="720" height="720">' +
                    // 电路走线（45° 折角，PCB 风格）
                    '<g fill="none" stroke="' + TEAL + '" stroke-width="1.2" stroke-opacity="' + t(0.09) + '">' +
                        '<path d="M40 120 H180 L240 180 V300"/>' +
                        '<path d="M700 60 H560 L500 120 V220 H420"/>' +
                        '<path d="M120 700 V560 L180 500 H300"/>' +
                        '<path d="M680 700 V600 L620 540 H520 V460"/>' +
                        '<path d="M360 40 V140 L300 200"/>' +
                        '<path d="M420 720 V620 L480 560"/>' +
                        '<path d="M20 460 H120 L160 420"/>' +
                    '</g>' +
                    // 走线端点焊盘
                    '<g fill="' + TEAL + '" fill-opacity="' + t(0.13) + '">' +
                        '<circle cx="240" cy="300" r="4"/><circle cx="420" cy="220" r="4"/>' +
                        '<circle cx="300" cy="500" r="4"/><circle cx="520" cy="460" r="4"/>' +
                        '<circle cx="300" cy="200" r="4"/><circle cx="480" cy="560" r="4"/>' +
                        '<circle cx="40" cy="120" r="3"/><circle cx="360" cy="40" r="3"/>' +
                        '<circle cx="160" cy="420" r="3"/>' +
                    '</g>' +
                    gamepad(530, 80, 9, t(0.09)) +
                    gamepad(70, 350, 7, t(0.06)) +
                    brain(120, 555, t(0.09)) +
                    '<path d="M380 392 l44 26 -44 26 z" fill="' + TEAL + '" fill-opacity="' + t(0.07) + '"/>' +
                    invader(595, 350, 8, t(0.08)) +
                    '</svg>';
            }

            const base = document.getElementById('bgPattern');
            const glow = document.getElementById('bgPatternGlow');
            const toUrl = (svg) => 'url("data:image/svg+xml;charset=utf-8,' + svg.replace(/#/g, '%23').replace(/"/g, "'") + '")';
            base.style.backgroundImage = toUrl(patternSVG(1));
            glow.style.backgroundImage = toUrl(patternSVG(3.5));

            // 鼠标光照：用 GSAP 平滑追踪光斑位置，照亮经过的底纹
            const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            window.addEventListener('pointermove', (e) => {
                if (reduceMotion) {
                    glow.style.setProperty('--mx', e.clientX + 'px');
                    glow.style.setProperty('--my', e.clientY + 'px');
                } else {
                    gsap.to(glow, {
                        '--mx': e.clientX + 'px',
                        '--my': e.clientY + 'px',
                        duration: 0.35,
                        ease: 'power3.out',
                        overwrite: 'auto'
                    });
                }
            });

            // 玻璃卡片内部随鼠标移动的高光（事件委托，所有卡片共用一个监听器）
            document.addEventListener('pointermove', (e) => {
                const card = e.target.closest && e.target.closest('.glass-card');
                if (card) {
                    const r = card.getBoundingClientRect();
                    card.style.setProperty('--cx', (e.clientX - r.left) + 'px');
                    card.style.setProperty('--cy', (e.clientY - r.top) + 'px');
                }
            });
        })();

        /* ==================== 磁吸量子粒子尾迹场（高性能鼠标拖拽滑动特效） ==================== */
        (function() {
            const canvas = document.getElementById('matrixCanvas');
            const ctx = canvas.getContext('2d');
            let w, h;
            let particles = [];
            let backgroundStars = [];
            let rafId = null;
            let mouse = { x: -9999, y: -9999, lastX: -9999, lastY: -9999 };
            function resize() {
                w = canvas.width = window.innerWidth;
                h = canvas.height = window.innerHeight;

                backgroundStars = [];
                const density = Math.floor((w * h) / 8000);
                for(let i = 0; i < density; i++) {
                    backgroundStars.push({
                        x: Math.random() * w,
                        y: Math.random() * h,
                        size: Math.random() * 1.2 + 0.6,
                        alpha: Math.random() * 0.12 + 0.04
                    });
                }
            }
            window.addEventListener('resize', resize);

            window.addEventListener('mousemove', (e) => {
                mouse.x = e.clientX;
                mouse.y = e.clientY;
                if (mouse.lastX !== -9999) {
                    const speedX = mouse.x - mouse.lastX;
                    const speedY = mouse.y - mouse.lastY;
                    const speed = Math.sqrt(speedX * speedX + speedY * speedY);

                    // 当鼠标有实质位移时，喷射量子发光方块尾迹
                    if (speed > 1.5) {
                        const pCount = Math.min(Math.floor(speed / 2.5), 5);
                        for(let i = 0; i < pCount; i++) {
                            particles.push({
                                x: mouse.x + (Math.random() - 0.5) * 8,
                                y: mouse.y + (Math.random() - 0.5) * 8,
                                vx: speedX * 0.12 + (Math.random() - 0.5) * 1.5,
                                vy: speedY * 0.12 + (Math.random() - 0.5) * 1.5,
                                size: Math.random() * 3.5 + 1.5,
                                alpha: 0.75,
                                decay: Math.random() * 0.025 + 0.015
                            });
                        }
                    }
                }
                mouse.lastX = mouse.x;
                mouse.lastY = mouse.y;
            });
            document.addEventListener('mouseleave', () => {
                mouse.x = -9999; mouse.y = -9999;
                mouse.lastX = -9999; mouse.lastY = -9999;
            });
            resize();
            function animate() {
                ctx.clearRect(0, 0, w, h);
                // 1. 绘制静态量子背景星图
                backgroundStars.forEach(star => {
                    ctx.fillStyle = `rgba(0, 217, 197, ${star.alpha})`;
                    ctx.beginPath();
                    ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
                    ctx.fill();
                    // 局部轻量磁吸连线，营造空间感
                    if (mouse.x !== -9999) {
                        const dx = mouse.x - star.x;
                        const dy = mouse.y - star.y;
                        const dist = Math.sqrt(dx * dx + dy * dy);
                        if (dist < 90) {
                            ctx.strokeStyle = `rgba(0, 217, 197, ${(90 - dist) * 0.0012})`;
                            ctx.lineWidth = 0.4;
                            ctx.beginPath();
                            ctx.moveTo(star.x, star.y);
                            ctx.lineTo(mouse.x, mouse.y);
                            ctx.stroke();
                        }
                    }
                });
                // 2. 绘制拖拽量子微粒
                for (let i = particles.length - 1; i >= 0; i--) {
                    const p = particles[i];
                    p.x += p.vx;
                    p.y += p.vy;
                    p.vx *= 0.95;
                    p.vy *= 0.95;
                    p.alpha -= p.decay;
                    if (p.alpha <= 0) {
                        particles.splice(i, 1);
                        continue;
                    }
                    ctx.fillStyle = `rgba(0, 217, 197, ${p.alpha})`;
                    ctx.fillRect(p.x - p.size / 2, p.y - p.size / 2, p.size, p.size);

                    if (i > 0 && Math.random() < 0.1) {
                        ctx.strokeStyle = `rgba(0, 217, 197, ${p.alpha * 0.15})`;
                        ctx.lineWidth = 0.6;
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(particles[i-1].x, particles[i-1].y);
                        ctx.stroke();
                    }
                }
                rafId = requestAnimationFrame(animate);
            }
            // 标签页不可见时暂停绘制，省电省 CPU
            document.addEventListener('visibilitychange', () => {
                if (document.hidden) {
                    if (rafId) cancelAnimationFrame(rafId);
                    rafId = null;
                } else if (!rafId) {
                    animate();
                }
            });
            animate();
        })();

        /* ==================== GSAP 动效系统 ==================== */
        (function() {
            gsap.registerPlugin(ScrollTrigger);
            if (window.MotionPathPlugin) gsap.registerPlugin(MotionPathPlugin);
            gsap.defaults({ ease: "power3.out", duration: 0.8 });

            // GSAP 官方 horizontalLoop helper（首尾无缝的横向循环时间轴，
            // 附带 next()/previous() 按卡步进），见 gsap.com/docs helper functions
            function horizontalLoop(items, config) {
                items = gsap.utils.toArray(items);
                config = config || {};
                let tl = gsap.timeline({
                        repeat: config.repeat, paused: config.paused, defaults: { ease: "none" },
                        onReverseComplete: () => tl.totalTime(tl.rawTime() + tl.duration() * 100)
                    }),
                    length = items.length,
                    startX = items[0].offsetLeft,
                    times = [], widths = [], xPercents = [],
                    curIndex = 0,
                    pixelsPerSecond = (config.speed || 1) * 100,
                    snap = config.snap === false ? v => v : gsap.utils.snap(config.snap || 1),
                    totalWidth, curX, distanceToStart, distanceToLoop, item, i;
                gsap.set(items, {
                    xPercent: (i, el) => {
                        let w = widths[i] = parseFloat(gsap.getProperty(el, "width", "px"));
                        xPercents[i] = snap(parseFloat(gsap.getProperty(el, "x", "px")) / w * 100 + gsap.getProperty(el, "xPercent"));
                        return xPercents[i];
                    }
                });
                gsap.set(items, { x: 0 });
                totalWidth = items[length - 1].offsetLeft + xPercents[length - 1] / 100 * widths[length - 1] - startX
                    + items[length - 1].offsetWidth * gsap.getProperty(items[length - 1], "scaleX")
                    + (parseFloat(config.paddingRight) || 0);
                for (i = 0; i < length; i++) {
                    item = items[i];
                    curX = xPercents[i] / 100 * widths[i];
                    distanceToStart = item.offsetLeft + curX - startX;
                    distanceToLoop = distanceToStart + widths[i] * gsap.getProperty(item, "scaleX");
                    tl.to(item, { xPercent: snap((curX - distanceToLoop) / widths[i] * 100), duration: distanceToLoop / pixelsPerSecond }, 0)
                      .fromTo(item,
                          { xPercent: snap((curX - distanceToLoop + totalWidth) / widths[i] * 100) },
                          { xPercent: xPercents[i], duration: (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond, immediateRender: false },
                          distanceToLoop / pixelsPerSecond)
                      .add("label" + i, distanceToStart / pixelsPerSecond);
                    times[i] = distanceToStart / pixelsPerSecond;
                }
                function toIndex(index, vars) {
                    vars = vars || {};
                    (Math.abs(index - curIndex) > length / 2) && (index += index > curIndex ? -length : length);
                    let newIndex = gsap.utils.wrap(0, length, index),
                        time = times[newIndex];
                    if (time > tl.time() !== index > curIndex) {
                        vars.modifiers = { time: gsap.utils.wrap(0, tl.duration()) };
                        time += tl.duration() * (index > curIndex ? 1 : -1);
                    }
                    curIndex = newIndex;
                    vars.overwrite = true;
                    return tl.tweenTo(time, vars);
                }
                tl.next = vars => toIndex(curIndex + 1, vars);
                tl.previous = vars => toIndex(curIndex - 1, vars);
                tl.times = times;
                tl.progress(1, true).progress(0, true);
                if (config.reversed) { tl.vars.onReverseComplete(); tl.reverse(); }
                return tl;
            }

            const mm = gsap.matchMedia();
            mm.add(
                {
                    reduceMotion: "(prefers-reduced-motion: reduce)",
                    motionOK: "(prefers-reduced-motion: no-preference)",
                    isDesktop: "(min-width: 1024px)"
                },
                (context) => {
                    // 用户系统开了"减弱动态效果"：不创建任何入场/视差动画，内容直接可见
                    if (context.conditions.reduceMotion) return;
                    const isDesktop = context.conditions.isDesktop;
                    let restoreCaseGallery = null;

                    /* ---------- 1. Hero 入场时间轴（header 自顶滑入 → 标题逐行上浮） ---------- */
                    gsap.timeline()
                        .from("#siteHeader", { y: -64, autoAlpha: 0, duration: 0.6 })
                        .from(".hero-line", { y: 70, autoAlpha: 0, duration: 0.62, stagger: 0.09, ease: "power4.out" }, "-=0.3")
                        .from("#heroSub", { y: 24, autoAlpha: 0, duration: 0.45 }, "-=0.42")
                        .from("#heroModes", { y: 20, autoAlpha: 0, duration: 0.4, ease: "power3.out" }, "-=0.28")
                        .from("#heroWelcome", { y: 18, autoAlpha: 0, duration: 0.4, ease: "power3.out" }, "-=0.3")
                        .from("#heroCreditCard", { y: 22, autoAlpha: 0, scale: 0.97, duration: 0.55, ease: "power3.out" }, "-=0.2")
                        .from("#heroCtaWrap", { y: 20, autoAlpha: 0, scale: 0.85, duration: 0.6, ease: "back.out(1.7)" }, "-=0.4")
                        .from("#heroScrollHint", { autoAlpha: 0, duration: 0.6 }, "-=0.2");

                    // 下滑提示箭头持续浮动
                    gsap.to("#heroScrollHint", { y: 8, repeat: -1, yoyo: true, duration: 0.9, ease: "sine.inOut" });

                    /* ---------- 2. Hero 滚出视差：内容上移 + 渐隐（scrub 跟手） ---------- */
                    gsap.to("#heroContent", {
                        yPercent: -20,
                        autoAlpha: 0,
                        ease: "none",
                        scrollTrigger: {
                            trigger: "#hero",
                            start: "top top",
                            end: "bottom 40%",
                            scrub: true
                        }
                    });

                    /* ---------- 3. 章节标题：数字徽章弹入 + 文案滑入 ---------- */
                    gsap.utils.toArray(".section-head").forEach((head) => {
                        const tl = gsap.timeline({
                            scrollTrigger: {
                                trigger: head,
                                start: "top 85%",
                                toggleActions: "play none none reverse"
                            }
                        });
                        const badge = head.querySelector(".step-badge");
                        if (badge) {
                            tl.from(badge, { scale: 0, rotation: -90, duration: 0.5, ease: "back.out(2)" });
                        }
                        tl.from(head.querySelectorAll(".head-text"), {
                            x: -28, autoAlpha: 0, duration: 0.6, stagger: 0.08
                        }, "-=0.2");
                    });

                    /* ---------- 4. 通用区块上浮入场（动画打在外层 wrapper 上，
                                    避免与 .glass-card 自身的 hover transform 过渡冲突） ---------- */
                    gsap.utils.toArray("[data-reveal]").forEach((el) => {
                        gsap.from(el, {
                            y: 56,
                            autoAlpha: 0,
                            duration: 0.9,
                            scrollTrigger: {
                                trigger: el,
                                start: "top 85%",
                                toggleActions: "play none none reverse"
                            }
                        });
                    });

                    /* ---------- 5. 起步清单逐项滑入 ---------- */
                    gsap.from(".roadmap-item", {
                        x: -20,
                        autoAlpha: 0,
                        duration: 0.5,
                        stagger: 0.08,
                        scrollTrigger: { trigger: "#roadmapList", start: "top 90%" }
                    });

                    /* ---------- 6. 优秀案例动效：3D 立牌入场 + 跟手倾斜 + MotionPath 飞船巡航 ---------- */
                    const dealTrack = document.getElementById('carouselTrack');
                    const dealItems = gsap.utils.toArray('.carousel-item');

                    // 卡片 3D 跟手倾斜（仅鼠标等精确指针设备；入场结束后启用，避免与入场 transform 抢写）
                    function enableCardTilt() {
                        if (!window.matchMedia('(pointer: fine)').matches) return;
                        dealItems.forEach((item) => {
                            gsap.set(item, { transformPerspective: 700 });
                            const toRX = gsap.quickTo(item, 'rotationX', { duration: 0.5, ease: 'power2.out' });
                            const toRY = gsap.quickTo(item, 'rotationY', { duration: 0.5, ease: 'power2.out' });
                            item.addEventListener('pointermove', (e) => {
                                const r = item.getBoundingClientRect();
                                toRY(((e.clientX - r.left) / r.width - 0.5) * 4.5);
                                toRX(((e.clientY - r.top) / r.height - 0.5) * -3.5);
                            });
                            item.addEventListener('pointerleave', () => { toRX(0); toRY(0); });
                        });
                    }

                    // 3D 立牌入场：卡片从"向后倒下"的状态依次立起。
                    // 只动 transform、不碰布局，对横向 scroll-snap 容器绝对安全。
                    gsap.set(dealTrack, { perspective: 900 });
                    gsap.set(dealItems, { autoAlpha: 0 });
                    ScrollTrigger.create({
                        trigger: dealTrack,
                        start: 'top 82%',
                        once: true,
                        onEnter: () => {
                            gsap.fromTo(dealItems,
                                { autoAlpha: 0, y: 80, rotationX: -58, scale: 0.9, transformOrigin: 'center bottom' },
                                {
                                    autoAlpha: 1,
                                    y: 0,
                                    rotationX: 0,
                                    scale: 1,
                                    duration: 0.85,
                                    ease: 'back.out(1.4)',
                                    stagger: { each: 0.07 },
                                    onComplete: () => {
                                        // 桌面循环模式下不能 clearProps：清 transform 会把循环用的 xPercent 一并抹掉
                                        if (!window.__caseLoop) gsap.set(dealItems, { clearProps: 'transform' });
                                        enableCardTilt();
                                    }
                                }
                            );
                        }
                    });

                    // 像素飞船沿贝塞尔曲线巡航，进度由滚动 scrub 驱动，自动朝向航向
                    if (window.MotionPathPlugin) {
                        gsap.set('#caseShip', { autoAlpha: 0.45 });
                        gsap.to('#caseShip', {
                            motionPath: {
                                path: '#shipPathLine',
                                align: '#shipPathLine',
                                alignOrigin: [0.5, 0.5],
                                autoRotate: 90
                            },
                            ease: 'none',
                            scrollTrigger: {
                                trigger: '#cases',
                                start: 'top bottom',
                                end: 'bottom top',
                                scrub: 1.2,
                                invalidateOnRefresh: true
                            }
                        });
                    }

                    /* ---------- 6.5 桌面端：无缝循环滚动长廊 ----------
                       卡片队列匀速循环漂移、首尾无缝衔接，不钉住页面、
                       不占用纵向滚动；悬停暂停方便阅读和点击，左右按钮按卡步进。
                       手机端 / 减弱动态时保留原生横滑 + 按钮方案。 */
                    if (isDesktop) {
                        dealTrack.scrollLeft = 0;
                        dealTrack.style.overflow = 'hidden';   // 循环靠 transform，轨道自身不再滚动
                        dealTrack.style.scrollSnapType = 'none';
                        const buildLoop = () => horizontalLoop(dealItems, { repeat: -1, speed: 0.55 });
                        let caseLoop = buildLoop();
                        window.__caseLoop = caseLoop;
                        const pauseLoop = () => caseLoop && caseLoop.pause();
                        const playLoop = () => caseLoop && caseLoop.play();
                        dealTrack.addEventListener('mouseenter', pauseLoop);
                        dealTrack.addEventListener('mouseleave', playLoop);
                        // 桌面区间内窗口尺寸变化时重建循环（卡宽变了，循环距离要重算）
                        let rebuildTimer = null;
                        const onResize = () => {
                            clearTimeout(rebuildTimer);
                            rebuildTimer = setTimeout(() => {
                                const wasPaused = caseLoop && caseLoop.paused();
                                if (caseLoop) caseLoop.kill();
                                gsap.set(dealItems, { xPercent: 0, x: 0 });
                                caseLoop = buildLoop();
                                window.__caseLoop = caseLoop;
                                if (wasPaused) caseLoop.pause();
                            }, 250);
                        };
                        window.addEventListener('resize', onResize);
                        restoreCaseGallery = () => {
                            window.removeEventListener('resize', onResize);
                            dealTrack.removeEventListener('mouseenter', pauseLoop);
                            dealTrack.removeEventListener('mouseleave', playLoop);
                            clearTimeout(rebuildTimer);
                            if (caseLoop) caseLoop.kill();
                            delete window.__caseLoop;
                            gsap.set(dealItems, { xPercent: 0, x: 0, clearProps: 'transform' });
                            dealTrack.style.overflow = '';
                            dealTrack.style.scrollSnapType = '';
                        };
                    }

                    /* ---------- 7. 资源卡三连入场 ---------- */
                    gsap.from(".resource-item", {
                        y: 48,
                        autoAlpha: 0,
                        duration: 0.7,
                        ease: "power2.out",
                        stagger: 0.12,
                        scrollTrigger: { trigger: "#resourceGrid", start: "top 85%" }
                    });

                    /* ---------- 8. 页脚淡入 ---------- */
                    gsap.from("footer", {
                        autoAlpha: 0,
                        y: 16,
                        scrollTrigger: { trigger: "footer", start: "top 96%" }
                    });

                    // pin 会在文档流里插入占位空间，按触发位置重排刷新顺序，
                    // 避免案例区之后的触发点(模板区/资源区/页脚)位置算错
                    ScrollTrigger.sort();

                    // 断点/偏好切换时 matchMedia 自动回收动画，这里还原手动改过的样式
                    return () => {
                        if (restoreCaseGallery) restoreCaseGallery();
                    };
                }
            );
        })();

        /* ==================== 优质品类游戏 ==================== */
        (function() {
            const games = [
                ['INVADE','音乐','2026/08/17','立绘、CG 与音乐表现接近原生，包含 PVP 对战打歌模式。','866190'],
                ['不经典力学 NEWTONignore','休闲益智','2026/08/09','清新的二次元画面，将牛顿定律卡牌融入物理解谜。','895312'],
                ['颅内坍缩指南 NewtonTaker','休闲益智','2026/08/09','手绘平台解谜与物理知识结合，玩法和叙事契合度高。','890049'],
                ['幻海航迹','Roguelike','2026/08/07','带肉鸽元素的摩托艇竞技，视听表现与动效完成度突出。','902204'],
                ['撒币之旅','Roguelike','2026/08/04','弹珠 Roguelike，构筑选择丰富，战斗反馈流畅爽快。','887975'],
                ['在苹果落下之前','文字剧情','2026/07/31','用物理定律破解世界异常，黑白铅笔画风辨识度很高。','890943'],
                ['海龟汤调查局','文字剧情','2026/07/26','美术与 UI 精致，并加入 AI 视频演出丰富案件体验。','893483'],
                ['公式对决','休闲益智','2026/07/22','通过填写数学公式生成轨迹，创意清晰且寓教于乐。','887223'],
                ['云岛造物工坊','模拟经营','2026/07/17','清新简约的 UGC 模拟建造，支持昼夜、布置与自由镜头。','885435'],
                ['召唤师模拟器：史莱姆军团','放置养成','2026/07/17','复古像素放置养成，技能树完整，特效反馈表现良好。','888299'],
                ['重生：新婚旧梦','文字剧情','2026/07/17','接近原生体验的女性向叙事解谜，剧情具备连续钩子。','884296'],
                ['镜渡','动作冒险','2026/07/14','双人视角的平台跳跃解谜，核心玩法成熟清晰。','874779'],
                ['跳槽人生','策略卡牌','2026/07/13','类小丑牌的跳槽模拟，通过卡牌构筑提升角色身价。','875196'],
                ['方块跳跃','休闲益智','2026/07/12','黑白极简跳跃游戏，落点随机变化，动作反馈自然。','882538'],
                ['坠入深渊','动作冒险','2026/07/09','完整的纵向探索肉鸽动作玩法，支路、成长与武器系统齐全。','874893'],
                ['跃点矩阵','文字剧情','2026/07/09','类桥梁工程师的物理解谜，关卡引导与黑色幽默兼具。','875050'],
                ['摘星少女','动作冒险','2026/07/08','轻量平台跳跃，关卡梯度合理，视听和操作反馈稳定。','874814'],
                ['笨蛋AI也想读懂心跳','文字剧情','2026/07/07','以 AI 学习人类情绪为主题，文本自然且题材玩法融合良好。','876817'],
                ['越跳越有钱','放置养成','2026/07/06','丝滑讨喜的放置点击玩法，加入肉鸽增益选择。','876002'],
                ['出海去钓鱼','模拟经营','2026/06/19','卡通像素美术与 UI 表现突出，具备完整的钓鱼成长框架。','871150'],
                ['霓虹极速','休闲益智','2026/06/16','赛博霓虹跑酷，音乐与画面配合出色，速度感鲜明。','869990'],
                ['宿命旅途','策略卡牌','2026/06/15','完成度较高的卡牌放置游戏，系统和视觉统一性良好。','856061'],
                ['碰碰车大乱斗','休闲益智','2026/06/15','像素碰碰车乱斗，包含道具赛与涂鸦等多种模式。','871584'],
                ['上菜啦！猫咪食堂','模拟经营','2026/06/10','接近原生体验的模拟经营，玩法循环和整体完成度较好。','869271'],
                ['神人猎头公司','模拟经营','2026/06/10','创意人事模拟器，以 AI 问答和 KPI 判定强化代入感。','868966'],
                ['散装武神：拼出个神器','Roguelike','2026/06/06','动作品类中少见的高完成度作品，体验流畅且有乐趣。','867434'],
                ['王的纹章-中世纪纹章官模拟器','模拟经营','2026/06/03','题材独特、框架完整的中世纪纹章设计师模拟器。','852272'],
                ['终末少女：弹珠物语','角色扮演','2026/06/01','弹珠、二次元与肉鸽元素结合，整体美术表现成熟。','827129']
            ];
            const legacyGames = [
                ['C9！','策略卡牌','2026/01/01','存量游戏：策略模拟类代表作品。','854768'],['最后的五式','策略卡牌','2026/01/01','存量游戏：策略模拟类代表作品。','864924'],['杀戮轮盘','策略卡牌','2026/01/01','存量游戏：策略模拟类代表作品。','859703'],['荣耀小镇','策略卡牌','2026/01/01','存量游戏：策略模拟类代表作品。','854565'],['翡翠经营模拟器','策略卡牌','2026/01/01','存量游戏：策略模拟类代表作品。','860950'],['抓住那柄锤','策略卡牌','2026/01/01','存量游戏：策略模拟类代表作品。','846092'],
                ['爆破大亨','休闲益智','2026/01/01','存量游戏：休闲益智类代表作品。','864680'],['另存为：','休闲益智','2026/01/01','存量游戏：休闲益智类代表作品。','854693'],['猫猫方块工坊','休闲益智','2026/01/01','存量游戏：休闲益智类代表作品。','852948'],['时间捡屎','休闲益智','2026/01/01','存量游戏：休闲益智类代表作品。','865052'],['天才游戏','休闲益智','2026/01/01','存量游戏：休闲益智类代表作品。','846159'],['象棋与轰炸','休闲益智','2026/01/01','存量游戏：休闲益智类代表作品。','862798'],['再播亿分钟','休闲益智','2026/01/01','存量游戏：休闲益智类代表作品。','835357'],['全是广告的游戏','休闲益智','2026/01/01','存量游戏：休闲益智类代表作品。','844285'],
                ['超级红温','动作冒险','2026/01/01','存量游戏：动作冒险类代表作品。','856458'],['秘境旅人','动作冒险','2026/01/01','存量游戏：动作冒险类代表作品。','841678'],['黄金大镖客','动作冒险','2026/01/01','存量游戏：动作冒险类代表作品。','844228'],['我的甲方是阿飘','文字剧情','2026/01/01','存量游戏：文字剧情类代表作品。','859936'],['镜中人','文字剧情','2026/01/01','存量游戏：文字剧情类代表作品。','854776'],['虚环之璃：伪人安保亭','文字剧情','2026/01/01','存量游戏：文字剧情类代表作品。','828698'],['矫诏：蜀汉','文字剧情','2026/01/01','存量游戏：文字剧情类代表作品。','845985'],['怦然心动','文字剧情','2026/01/01','存量游戏：文字剧情类代表作品。','849034'],['雾水镇','文字剧情','2026/01/01','存量游戏：文字剧情类代表作品。','844790'],['破碎交响','音乐','2026/01/01','存量游戏：音乐节奏类代表作品。','865014'],['节奏星动','音乐','2026/01/01','存量游戏：音乐节奏类代表作品。','839700'],['锈蚀酒馆 RustyBar','Roguelike','2026/01/01','存量游戏：Roguelike 类代表作品。','854726'],['末日求生：搜打撤','Roguelike','2026/01/01','存量游戏：Roguelike 类代表作品。','855736'],['肉鸽 2048','Roguelike','2026/01/01','存量游戏：Roguelike 类代表作品。','831123'],['全村最好的剑','Roguelike','2026/01/01','存量游戏：Roguelike 类代表作品。','838615'],['三国幸存者','Roguelike','2026/01/01','存量游戏：Roguelike 类代表作品。','835357'],['完蛋！我被手机做局了！','其他','2026/01/01','存量游戏：其他品类代表作品。','865078'],['小世界','其他','2026/01/01','存量游戏：其他品类代表作品。','835574']
            ];
            games.push(...legacyGames.filter(old => !games.some(game => game[4] === old[4])));
            const icons = {
                '866190':'Fmd37IYSW0mubV1Euz4zW5k2XFJT.png','895312':'FhIShhwnE4c7ArMZiGf63zNolhJ9.jpg','890049':'Fh_wC5VJLWc0KIXXOcmcRufp7ZX7.png','902204':'FvPTGbXlMqTplN_aLTOvInZVTr9t.png','887975':'f1ab7868f2da68295a982184839c5371.png','890943':'FnYRimzuzRtMUAIMKtdMQ4KMxoxx.png','893483':'FgGkaQgLjBbzAebhSltPNKt5aEJq.png','887223':'Fi2SWBrSVLG7rpNAGhHIvKsanNpF.png','885435':'FnCbWzVGusgCW2FTMlJ0esDQzAdf.jpg','888299':'a92f947f01b05796afde514fd2448c3f.jpg','884296':'c44eb98ab62e49a9595c6c2294a69060.jpg','874779':'1ec82aa7490bfa1dc274f7f1f19f9338.jpg','875196':'FiDMDUBJ5dlyMKtySI53k-cg4FHO.jpg','882538':'0134fe554210c65ef652081076150837.jpg','874893':'FswR-MW9jfRfD6shnbcWgK8iVo-y.png','875050':'4d5f7fa954a64279a17425a804eeb242.jpg','874814':'32867c021b04aa01697be7598ceca9d0.png','876817':'FtXEO47Lyd58oDcuhY-ylQ5DLYaY.png','876002':'FvjCEratWTySLPGthJ0zpi38sYyF.png','871150':'9a04bfede3117638abe17a5dc0a97097.png','869990':'b3eb322de2aa5aaf153cad7a9dd0ce63.png','856061':'FjuaQ0VwERDHNQ9uoU7G8SzZ9h_g.png','871584':'FivbqVWr74TdDgwe5Wpy8pA2y_fI.png','869271':'Fs2lEa1TEGN-wLPy4BcBkggRazm8.png','868966':'FvB5NPigF8loRNZHNui3EAOlEPYw.png','867434':'lsQ1xMIe4f7IcesGAO6gTlyq1r-V.png','852272':'f747eba5609c27b6e23a93a12cb4b301.png','827129':'0e511353f2ccc755dd490216ace3febc.png',
                '854768':'FgeOLU4Dvjlp90LFvkmFD4sfQzvn.jpg','864924':'FjMmS3uWLff2Q_WF42qvbtXKjR07.png','859703':'85c79800070a11129a735ad6b1077474.png','854565':'FpkGJC1lC2fibx9c5IM2ToU4BlVB.png','860950':'5c78c3a6afb887d9f87979ee05f5d522.png','846092':'FvSfazK5fMUPvfiRks8Q2scmW1pW.jpg','864680':'b1a8c3c0d1b312a3d6e27984d0681e1c.png','854693':'c5f9fbea2b1dfef94beceab62ab98dbd.png','852948':'333a52f98e2fcee428b8943664e0e04c.png','865052':'Fvpl8j4hZRk6mTotvBG42EnmUOL9.png','846159':'FkQPtfdY2bjhdEeS5XWes4bQEj-C.png','862798':'FpHatErqk87m5k1Z7uV1o5dRx498.png','835357':'FtSPPh1nLXx7TF71mWYFi54b6YcI.png','844285':'FhjHWiNoS_2LT1fJHcOsOUksXBoi.jpg','856458':'Fp_Z9vUQyzkeUN9VwNMbZhni0oBr.png','841678':'FrZFLpAO-URWmVtN9gFwTcjWreGU.png','844228':'570118e9099d1f79556bf4be5b57750d.png','859936':'19c1c5641c14a1b95c8d5a7485203e23.png','854776':'FpjfjRcm3Fv0La8mRQl_X8pjdvAP.jpg','828698':'FsQ7GDDzUrOjsLxCffoGaEEj9u7N.png','845985':'Fo4o0VwOFC5JvgM0Gt4cOy-Jkk8V.jpg','849034':'FochvHq7WCf00TUsdH7GGtNu6V8C.png','844790':'FteKe8cYP-NsNgogerFmPlsuxnnk.png','865014':'FrEPhZN9hzoDwjQAV-CgsyMmDKwj.png','839700':'0e151a5220e5d9328f7047016c2f5f21.png','854726':'FskRCUVLz67lH2mqr0X1mpl1YT8i.png','855736':'FljgBESmFTpqwLPNaBsXXozcZ_Di.png','831123':'938d0912f2f8396729550a1d1d7f1718.png','838615':'Fsjv4HqHYTh_OKjJRm5qvn8THOBb.png','835574':'e59a936202b10699c3b0e3ecc9a52d53.jpg','865078':'FlCGxllu5eIzeqDResfL3etaHERP.png'
            };
            const filterWrap = document.getElementById('qualityGameFilters');
            const grid = document.getElementById('qualityGameGrid');
            if (!filterWrap || !grid) return;
            const categories = [...new Set(games.map(game => game[1]))]
                .sort((a, b) => games.filter(game => game[1] === b).length - games.filter(game => game[1] === a).length);
            let currentCategory = categories[0];
            function iconUrl(id) {
                return icons[id] ? `./assets/game-img/${id}.webp` : './assets/taptap-icon.png';
            }
            function render(category) {
                currentCategory = category;
                const selected = games.filter(game => game[1] === category);
                grid.innerHTML = selected.map(game => `
                    <a href="https://www.taptap.cn/app/${game[4]}" class="rank-item group block">
                        <div class="rank-icon aspect-square rounded-[28px] overflow-hidden border border-transparent bg-neutral-900 relative transition-[border-color,box-shadow,transform] duration-300 ease-out group-hover:border-[#00D9C5]/70">
                            <img src="${iconUrl(game[4])}" alt="${game[0]}" loading="lazy" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.035]" />
                            <svg class="rank-trace" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><rect x="1.2" y="1.2" width="97.6" height="97.6" rx="13" fill="none" stroke="#00D9C5" stroke-width="1.6" pathLength="100"/></svg>
                        </div>
                        <h3 class="mt-3 text-center text-sm text-gray-300 truncate transition-colors group-hover:text-white">${game[0]}</h3>
                    </a>`).join('');
                if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                    gsap.fromTo(grid.querySelectorAll('.rank-item'), {autoAlpha:0, y:22, scale:.96}, {autoAlpha:1, y:0, scale:1, duration:.42, stagger:.045, ease:'power2.out', clearProps:'all'});
                    grid.querySelectorAll('.rank-trace rect').forEach(rect => gsap.set(rect, {strokeDashoffset:100}));
                }
            }
            categories.forEach((category, index) => {
                const button = document.createElement('button');
                button.type = 'button';
                const count = games.filter(game => game[1] === category).length;
                button.innerHTML = `<span class="font-mono text-xs">${String(index + 1).padStart(2, '0')}</span><span class="mx-2 opacity-30">/</span>${category}<span class="ml-1.5 opacity-60">${count}</span>`;
                button.className = 'rank-tab h-11 px-5 rounded-full text-sm border transition-all duration-300 ' + (index === 0 ? 'border-[#00D9C5]/55 bg-[#00D9C5]/10 text-[#00D9C5] shadow-[0_0_18px_rgba(0,217,197,.12)]' : 'border-transparent text-gray-400 hover:text-gray-200');
                button.addEventListener('click', () => {
                    if (currentCategory === category) return;
                    filterWrap.querySelectorAll('button').forEach(item => item.className = 'rank-tab h-11 px-5 rounded-full text-sm border transition-all duration-300 border-transparent text-gray-400 hover:text-gray-200');
                    button.className = 'rank-tab h-11 px-5 rounded-full text-sm border transition-all duration-300 border-[#00D9C5]/55 bg-[#00D9C5]/10 text-[#00D9C5] shadow-[0_0_18px_rgba(0,217,197,.12)]';
                    render(category);
                });
                filterWrap.appendChild(button);
            });
            filterWrap.addEventListener('pointerover', event => {
                const item = event.target.closest('.rank-tab');
                if (item && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) gsap.to(item, {y:-2, duration:.18, ease:'power2.out'});
            });
            filterWrap.addEventListener('pointerout', event => {
                const item = event.target.closest('.rank-tab');
                if (item) gsap.to(item, {y:0, duration:.18, ease:'power2.out'});
            });
            grid.addEventListener('pointerover', event => {
                const item = event.target.closest('.rank-item');
                if (!item || item.contains(event.relatedTarget)) return;
                const rect = item.querySelector('.rank-trace rect');
                if (rect && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) gsap.fromTo(rect, {strokeDashoffset:100}, {strokeDashoffset:0, duration:.65, ease:'power2.out'});
            });
            render(categories[0]);
        })();

        /* ==================== 帮助文档：通用 Prompt 高亮块 ==================== */
        (function() {
            const prompts = {
                'doc-prompt': {
                    label: '新人可直接复制', title: '游戏想法整理 Prompt',
                    text: '我想做一个可以在 TapTap制造中直接体验的小游戏。请先不要写代码，先帮我整理：核心玩法、玩家操作、胜利条件、失败条件、单局时长、画面风格，以及第一版最小可玩范围。最后列出还需要我补充的信息。'
                },
                'doc-preview': {
                    label: '反馈与调试', title: '截图定位问题 Prompt',
                    text: '请根据下面的现象、预期结果和截图，定位当前游戏问题。请只修改与这个问题直接相关的模块，不要重构其他内容，并告诉我修改后应该如何验证。现象：【填写】；预期：【填写】；复现步骤：【填写】。'
                },
                'doc-assets': {
                    label: '素材生成', title: '游戏素材 Prompt',
                    text: '请为我的游戏生成一套风格统一的素材方案。游戏类型：【填写】；素材用途：【角色/障碍/背景/按钮/音效】；画面风格：【填写】；视角：【填写】；尺寸或比例：【填写】。请分别说明主体、背景、透明要求、颜色限制和导出格式，不要添加未要求的文字。'
                },
                'doc-points': {
                    label: '效率提升', title: '一次整理多个问题 Prompt',
                    text: '请把下面的问题合并成一次修改任务，按影响程度排序，并只处理当前版本必须解决的内容。问题列表：【填写】。请输出：优先级、修改范围、完成标准、验证步骤，以及可以暂时不做的事项。'
                },
                'doc-publish': {
                    label: '发布前检查', title: '新手体验检查 Prompt',
                    text: '请按照 TapTap制造新手体验检查这个游戏：玩家是否知道第一步做什么、操作区域是否清楚、胜负反馈是否明确、失败后能否重开、手机端文字和按钮是否易读、是否存在卡住或无法继续的问题。请按“必须修复 / 建议优化 / 可以暂缓”分类，并给出验证方式。'
                }
            };
            Object.entries(prompts).forEach(([id, item]) => {
                const section = document.getElementById(id);
                if (!section || section.querySelector('.doc-prompt-callout')) return;
                const block = document.createElement('blockquote');
                block.className = 'doc-prompt-callout mt-6 rounded-xl border border-[#00D9C5]/30 bg-[#00D9C5]/[0.06] p-5 md:p-6';
                block.innerHTML = `<div class="flex items-center justify-between gap-3"><p class="text-xs font-mono tracking-[0.18em] text-[#00D9C5]">${item.label}</p><span class="text-xs text-gray-500">PROMPT</span></div><h4 class="mt-2 text-base md:text-lg font-semibold text-white">${item.title}</h4><p class="mt-3 text-sm leading-relaxed text-gray-200">${item.text}</p>`;
                section.appendChild(block);
            });
        })();

        /* ==================== 页面 Tab 切换（首页 / 帮助文档 / 优质品类游戏 / 开发实践文档） ==================== */
        (function() {
            const pages = {
                home: document.getElementById('page-home'),
                docs: document.getElementById('page-docs'),
                rank: document.getElementById('page-rank'),
                weekly: document.getElementById('page-weekly')
            };
            const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            // home 隐藏期间禁用其内部全部 ScrollTrigger：display:none 下触发位置
            // 会坍缩为 0，refresh 时会把 once 型入场动画"空耗"掉，导致切回后动画永久丢失
            function setHomeTriggers(active) {
                if (!window.ScrollTrigger) return;
                ScrollTrigger.getAll().forEach(st => {
                    if (st.trigger && pages.home.contains(st.trigger)) {
                        active ? st.enable(false) : st.disable(false);
                    }
                });
            }
            function showPage(key, animate) {
                if (!pages[key]) return;
                Object.keys(pages).forEach(k => pages[k].classList.toggle('hidden', k !== key));
                document.querySelectorAll('.nav-link[data-page]').forEach(a => {
                    a.classList.toggle('nav-active', a.dataset.page === key);
                });
                setHomeTriggers(key === 'home');
                window.scrollTo(0, 0);
                // tab 显隐改变布局，必须重算所有 ScrollTrigger 触发位置
                if (window.ScrollTrigger) ScrollTrigger.refresh();
                if (animate && !reduceMotion) {
                    gsap.fromTo(pages[key], { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.45, ease: 'power2.out', clearProps: 'all' });
                }
                if (history.replaceState) history.replaceState(null, '', '#' + key);
            }
            document.querySelectorAll('[data-page]').forEach(el => {
                el.addEventListener('click', (e) => {
                    e.preventDefault();
                    showPage(el.dataset.page, true);
                });
            });
            // 支持带 hash 直达某个 tab（如 xxx.html#docs）
            const initial = (location.hash || '').replace('#', '');
            if (initial && initial !== 'home' && pages[initial]) showPage(initial, false);
        })();

        /* ==================== 新手村 3 步路线:scroll-spy 高亮 + 青色进度线生长 ==================== */
        (function() {
            const steps = Array.from(document.querySelectorAll('.rail-step'));
            const lineFill = document.querySelector('.rail-line-fill');
            if (!steps.length || !window.ScrollTrigger) return;
            function setActive(i) {
                steps.forEach((s, idx) => {
                    s.classList.toggle('is-active', idx === i);
                    s.classList.toggle('is-done', idx < i);
                });
                // 一条连续青线随进度生长:step1=0% step2=50% step3=100%
                if (lineFill) lineFill.style.height = (steps.length > 1 ? (i / (steps.length - 1)) * 100 : 0) + '%';
            }
            ['#cases', '#starter', '#resources'].forEach((id, i) => {
                const el = document.querySelector(id);
                if (!el) return;
                ScrollTrigger.create({
                    trigger: el, start: 'top 45%', end: 'bottom 45%',
                    onToggle: (self) => { if (self.isActive) setActive(i); }
                });
            });
        })();

        /* ==================== 路线进度条联动（GSAP 数值缓动版） ==================== */
        (function() {
            const checkboxes = document.querySelectorAll('.roadmap-check');
            const progressBar = document.getElementById('progressBar');
            const progressPercent = document.getElementById('progressPercent');
            const counter = { val: 0 };
            const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

            function updateProgress() {
                const total = checkboxes.length;
                const checkedCount = Array.from(checkboxes).filter(cb => cb.checked).length;
                const percentage = Math.round((checkedCount / total) * 100);
                const dur = reduceMotion ? 0 : 0.6;

                gsap.to(progressBar, { width: percentage + "%", duration: dur, ease: "power2.out", overwrite: "auto" });
                gsap.to(counter, {
                    val: percentage,
                    duration: dur,
                    ease: "power2.out",
                    overwrite: "auto",
                    onUpdate: () => { progressPercent.innerText = Math.round(counter.val) + "%"; }
                });

                // 走完全部路线：进度条庆祝脉冲
                if (percentage === 100 && !reduceMotion) {
                    gsap.fromTo(progressBar,
                        { scaleY: 1 },
                        { scaleY: 2.4, transformOrigin: "center", duration: 0.18, yoyo: true, repeat: 1, ease: "power2.inOut" }
                    );
                }
            }

            checkboxes.forEach(cb => {
                cb.addEventListener('change', () => {
                    updateProgress();
                    // 勾选瞬间的回弹手感
                    if (cb.checked && !reduceMotion) {
                        gsap.fromTo(cb, { scale: 1.45 }, { scale: 1, duration: 0.45, ease: "back.out(3)" });
                    }
                });
            });
        })();

        /* ==================== 轮播控制器 (Carousel System) ==================== */
        (function() {
            const track = document.getElementById('carouselTrack');
            let autoPlayTimer = null;
            function getScrollStep() {
                return track.clientWidth;
            }
            function moveNext() {
                // 桌面循环长廊模式：按钮直接驱动循环时间轴步进一张
                if (window.__caseLoop) { window.__caseLoop.next({ duration: 0.6, ease: 'power2.inOut' }); return; }
                if (!track.clientWidth) return; // home 隐藏期间不空转
                const maxScroll = track.scrollWidth - track.clientWidth;
                if (track.scrollLeft >= maxScroll - 15) {
                    track.scrollLeft = 0;
                } else {
                    track.scrollLeft += getScrollStep();
                }
            }
            function startAutoPlay() {
                stopAutoPlay();
                if (window.__caseLoop) return; // 循环长廊自带匀速漂移，无需定时翻页
                autoPlayTimer = setInterval(moveNext, 5000);
            }
            function stopAutoPlay() {
                if (autoPlayTimer) clearInterval(autoPlayTimer);
            }
            track.addEventListener('mouseenter', stopAutoPlay);
            track.addEventListener('mouseleave', startAutoPlay);
            track.addEventListener('touchstart', stopAutoPlay, { passive: true });
            track.addEventListener('touchend', startAutoPlay, { passive: true });
            startAutoPlay();

            // 整卡可点：点击卡片任意位置等同点"进入游戏"；点中链接本身则走浏览器默认行为
            track.querySelectorAll('.glass-card').forEach(card => {
                const link = card.querySelector('a[href]');
                if (!link) return;
                card.addEventListener('click', (e) => {
                    if (e.target.closest('a')) return;
                    window.open(link.href, '_blank', 'noopener');
                });
            });
        })();

        /* ==================== 案例长廊手动进度条（替代左右箭头） ==================== */
        (function() {
            const bar = document.getElementById('caseScrubber');
            const track = document.getElementById('carouselTrack');
            if (!bar || !track) return;
            const rail = bar.firstElementChild;
            const fill = document.getElementById('caseScrubFill');
            const thumb = document.getElementById('caseScrubThumb');
            let dragging = false;
            let wasPlaying = false;

            // 当前进度：桌面读循环时间轴，移动端读原生 scrollLeft
            function currentProgress() {
                const lp = window.__caseLoop;
                if (lp) return lp.progress();
                const max = track.scrollWidth - track.clientWidth;
                return max > 0 ? track.scrollLeft / max : 0;
            }
            function render(p) {
                if (!rail.clientWidth) return; // tab 隐藏期间不渲染
                const pct = Math.min(1, Math.max(0, p));
                fill.style.width = (pct * 100) + '%';
                thumb.style.left = (pct * (rail.clientWidth - thumb.offsetWidth)) + 'px';
            }
            // 跟随漂移 / 滚动逐帧刷新进度显示
            gsap.ticker.add(() => { if (!dragging) render(currentProgress()); });

            function applyFromEvent(e) {
                const r = rail.getBoundingClientRect();
                if (!r.width) return;
                const p = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
                const lp = window.__caseLoop;
                if (lp) {
                    lp.progress(p);
                } else {
                    track.scrollLeft = p * (track.scrollWidth - track.clientWidth);
                }
                render(p);
            }
            bar.addEventListener('pointerdown', (e) => {
                dragging = true;
                bar.setPointerCapture(e.pointerId);
                track.style.scrollBehavior = 'auto'; // 拖动期间关掉平滑滚动，保证跟手
                const lp = window.__caseLoop;
                if (lp) { wasPlaying = !lp.paused(); lp.pause(); }
                applyFromEvent(e);
            });
            bar.addEventListener('pointermove', (e) => { if (dragging) applyFromEvent(e); });
            const endDrag = () => {
                if (!dragging) return;
                dragging = false;
                track.style.scrollBehavior = '';
                const lp = window.__caseLoop;
                if (lp && wasPlaying) lp.play();
            };
            bar.addEventListener('pointerup', endDrag);
            bar.addEventListener('pointercancel', endDrag);
        })();

(function(){var wrap=document.getElementById('heroCtaWrap');if(!wrap)return;var links=wrap.querySelectorAll('a');links.forEach(function(el,i){el.classList.add('maker-mode-btn');if(i===1)el.classList.add('local');el.addEventListener('pointermove',function(e){var r=el.getBoundingClientRect();el.style.setProperty('--px',((e.clientX-r.left)/r.width*100)+'%');el.style.setProperty('--py',((e.clientY-r.top)/r.height*100)+'%');},{passive:true});});})();
  (function(){
    var card=document.querySelector('#resourceGrid .resource-item:first-child a');
    if(!card) return;
    card.setAttribute('href','#docs#help-points');
    card.removeAttribute('data-page');
    var title=card.querySelector('h3');
    var desc=card.querySelector('p');
    if(title) title.textContent='积分获取指南';
    if(desc) desc.textContent='购买积分包，或了解积分计划申请方式';
    card.addEventListener('click',function(){
      var docs=document.getElementById('page-docs');
      var home=document.getElementById('page-home');
      if(home) home.classList.add('hidden');
      if(docs) docs.classList.remove('hidden');
      setTimeout(function(){var target=document.getElementById('help-points');if(target)target.scrollIntoView({behavior:'smooth',block:'start'});},40);
    });
  })();
  (function(){
    var points=document.getElementById('help-points');
    if(!points) return;
    var stack=points.parentElement;
    if(stack) stack.appendChild(points);
    var navLink=document.querySelector('a[href="#help-points"]');
    if(navLink && navLink.parentElement) navLink.parentElement.appendChild(navLink);
  })();

(function(){const r=document.getElementById('maker-paths-zk');if(!r)return;const grid=r.querySelector('.grid.grid-cols-1.sm\\:grid-cols-2.lg\\:grid-cols-4');if(!grid||grid.querySelector('[data-zk="commercial"]'))return;const b=document.createElement('button');b.className='zk-tab text-left px-5 py-6 md:px-8 md:py-8';b.dataset.zk='commercial';b.setAttribute('aria-selected','false');b.innerHTML='<div class="flex items-center gap-4"><span class="zk-icon grid h-11 w-11 place-items-center"><span class="text-2xl">◈</span></span><span class="text-xs font-mono tracking-[.18em] text-gray-500">04</span></div><h3 class="mt-5 text-xl font-bold text-white">商业化能力</h3><p class="mt-2 text-sm text-gray-500">让作品开始产生收益</p>';grid.appendChild(b);b.addEventListener('click',()=>{r.querySelectorAll('.zk-tab').forEach(t=>{t.classList.remove('active');t.setAttribute('aria-selected','false')});b.classList.add('active');b.setAttribute('aria-selected','true');const x=['04 / 商业化能力','从开发完成，到开始变现','TapTap制造支持接入激励广告。你可以用自然语言告诉 AI 想加入的广告机制，由 AI 协助完成开发与接入。完成开发者认证和财务主体认证后，即可为游戏配置激励广告。','自然语言描述 → AI 接入激励广告 → 开发者认证 → 财务主体认证','↗'];['kicker','title','copy','note','mark'].forEach((k,i)=>{const n=document.getElementById('zk-'+k);n.textContent=x[i];n.animate([{opacity:.2,transform:'translateY(12px)'},{opacity:1,transform:'translateY(0)'}],{duration:450,easing:'cubic-bezier(.2,.7,.2,1)',fill:'both'});});});})();

(function(){const r=document.getElementById('maker-paths-zk');if(!r)return;const h=r.querySelector('h2');if(h)h.textContent='核心优势';const lead=r.querySelector(':scope > .relative > p:nth-of-type(2)');if(lead)lead.textContent='从创作、迁移到上线与商业化，Maker 帮助开发者更高效地完成游戏全流程。';})();

(function(){const r=document.getElementById('maker-paths-zk');if(!r)return;const grid=[...r.querySelectorAll('div')].find(x=>x.className&&x.className.includes('lg:grid-cols-4'));if(!grid||grid.querySelector('[data-zk="commercial"]'))return;const b=document.createElement('button');b.className='zk-tab text-left px-5 py-6 md:px-8 md:py-8';b.dataset.zk='commercial';b.setAttribute('aria-selected','false');b.innerHTML='<div class="flex items-center gap-4"><span class="zk-icon grid h-11 w-11 place-items-center"><span class="text-2xl">◈</span></span><span class="text-xs font-mono tracking-[.18em] text-gray-500">04</span></div><h3 class="mt-5 text-xl font-bold text-white">商业化能力</h3><p class="mt-2 text-sm text-gray-500">让作品开始产生收益</p>';grid.appendChild(b);})();

(function(){const r=document.getElementById('maker-paths-zk');if(!r)return;const b=r.querySelector('[data-zk="commercial"]');if(!b)return;b.addEventListener('click',()=>{r.querySelectorAll('.zk-tab').forEach(t=>{t.classList.remove('active');t.setAttribute('aria-selected','false')});b.classList.add('active');b.setAttribute('aria-selected','true');const x=['04 / 商业化能力','从开发完成，到开始变现','TapTap制造支持接入激励广告。你可以用自然语言告诉 AI 想加入的广告机制，由 AI 协助完成开发与接入。完成开发者认证和财务主体认证后，即可为游戏配置激励广告。','自然语言描述 → AI 接入激励广告 → 开发者认证 → 财务主体认证','↗'];['kicker','title','copy','note','mark'].forEach((k,i)=>{const n=document.getElementById('zk-'+k);n.textContent=x[i];n.animate([{opacity:.2,transform:'translateY(12px)'},{opacity:1,transform:'translateY(0)'}],{duration:450,easing:'cubic-bezier(.2,.7,.2,1)',fill:'both'});});});})();

(function(){const r=document.getElementById('maker-paths-zk');if(!r)return;const first=r.querySelector('button.zk-tab');const grid=first&&first.parentElement;if(!grid||grid.querySelector('[data-zk="commercial"]'))return;const b=document.createElement('button');b.type='button';b.className='zk-tab text-left px-5 py-6 md:px-8 md:py-8';b.dataset.zk='commercial';b.setAttribute('aria-selected','false');b.innerHTML='<div class="flex items-center gap-4"><span class="zk-icon grid h-11 w-11 place-items-center"><span class="text-2xl">◈</span></span><span class="text-xs font-mono tracking-[.18em] text-gray-500">04</span></div><h3 class="mt-5 text-xl font-bold text-white">商业化能力</h3><p class="mt-2 text-sm text-gray-500">让作品开始产生收益</p>';grid.appendChild(b);b.addEventListener('click',function(){r.querySelectorAll('.zk-tab').forEach(t=>{t.classList.remove('active');t.setAttribute('aria-selected','false')});b.classList.add('active');b.setAttribute('aria-selected','true');const x=['04 / 商业化能力','从开发完成，到开始变现','TapTap制造支持接入激励广告。你可以用自然语言告诉 AI 想加入的广告机制，由 AI 协助完成开发与接入。完成开发者认证和财务主体认证后，即可为游戏配置激励广告。','自然语言描述 → AI 接入激励广告 → 开发者认证 → 财务主体认证','↗'];['kicker','title','copy','note','mark'].forEach((k,i)=>{const n=document.getElementById('zk-'+k);n.textContent=x[i];n.animate([{opacity:.2,transform:'translateY(12px)'},{opacity:1,transform:'translateY(0)'}],{duration:450,easing:'cubic-bezier(.2,.7,.2,1)',fill:'both'});});});})();

(function(){const r=document.getElementById('maker-paths-zk');const b=r&&r.querySelector('[data-zk="commercial"]');if(!b)return;b.addEventListener('click',function(ev){ev.stopImmediatePropagation();r.querySelectorAll('.zk-tab').forEach(t=>{t.classList.remove('active');t.setAttribute('aria-selected','false')});b.classList.add('active');b.setAttribute('aria-selected','true');const x=['04 / 商业化能力','从开发完成，到开始变现','TapTap制造支持接入激励广告。你可以用自然语言告诉 AI 想加入的广告机制，由 AI 协助完成开发与接入。完成开发者认证和财务主体认证后，即可为游戏配置激励广告。','自然语言描述 → AI 接入激励广告 → 开发者认证 → 财务主体认证','↗'];['kicker','title','copy','note','mark'].forEach((k,i)=>{const n=document.getElementById('zk-'+k);n.getAnimations().forEach(a=>a.cancel());n.textContent=x[i];n.animate([{opacity:.2,transform:'translateY(12px)'},{opacity:1,transform:'translateY(0)'}],{duration:450,easing:'cubic-bezier(.2,.7,.2,1)',fill:'both'});});},true);})();

/* Hero-only ASCII fluid field. Independent and removable as one block. */
(function(){
  const canvas=document.getElementById('heroFluidAscii');
  const hero=document.getElementById('hero');
  if(!canvas||!hero)return;
  const ctx=canvas.getContext('2d',{alpha:true});
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const glyphs=' .:+*#%@';
  let width=0,height=0,dpr=1,raf=0,running=false,last=0,elapsed=0;

  function resize(){
    const rect=hero.getBoundingClientRect();
    dpr=Math.min(window.devicePixelRatio||1,1.5);
    width=Math.max(1,Math.round(rect.width));
    height=Math.max(1,Math.round(rect.height));
    canvas.width=Math.round(width*dpr);
    canvas.height=Math.round(height*dpr);
    canvas.style.width=width+'px';
    canvas.style.height=height+'px';
    ctx.setTransform(dpr,0,0,dpr,0,0);
    if(!running||reduced)draw(performance.now(),true);
  }

  function draw(now,force){
    if(!force&&now-last<42){raf=requestAnimationFrame(draw);return;}
    const dt=last?Math.min((now-last)/1000,.08):0;
    last=now;
    if(!reduced)elapsed+=dt;
    ctx.clearRect(0,0,width,height);
    const mobile=width<768;
    const cell=mobile?15:13;
    const font=mobile?10:9;
    const centerX=width*(mobile?.84:.78);
    const centerY=height*.49;
    const radius=Math.min(width*(mobile?.54:.43),height*.62);
    ctx.font=`600 ${font}px ui-monospace,SFMono-Regular,Menlo,Consolas,monospace`;
    ctx.textAlign='center';
    ctx.textBaseline='middle';

    for(let y=cell*.5;y<height;y+=cell){
      for(let x=Math.max(0,width*(mobile?.47:.34));x<width;x+=cell){
        const nx=(x-centerX)/radius;
        const ny=(y-centerY)/radius;
        const triangle=Math.max(Math.abs(nx)*.9+ny*.5,-ny)-.69;
        const edge=Math.max(0,1-Math.abs(triangle)*7.4);
        const body=Math.max(0,1-(Math.abs(nx)*.72+Math.abs(ny)*.84));
        const flow=Math.sin(nx*8.2+elapsed*.62+Math.sin(ny*5.1-elapsed*.36))*.5+
                   Math.cos(ny*9.4-elapsed*.48+nx*2.7)*.32;
        const ripple=Math.sin(Math.hypot(nx*.9,ny)*13-elapsed*.8)*.18;
        const intensity=Math.max(0,edge*.74+body*(.22+flow*.17+ripple));
        if(intensity<.075)continue;
        const centerAvoid=Math.max(0,1-Math.hypot((x-width*.5)/(width*.31),(y-height*.48)/(height*.38)));
        const rightBias=Math.max(.12,Math.min(1,(x-width*.42)/(width*.45)));
        const alpha=Math.min(.31,intensity*.27)*rightBias*(1-centerAvoid*.9);
        if(alpha<.018)continue;
        const index=Math.min(glyphs.length-1,Math.max(1,Math.floor(intensity*(glyphs.length-1))));
        ctx.fillStyle=`rgba(119,174,170,${alpha.toFixed(3)})`;
        ctx.fillText(glyphs[index],x+Math.sin(y*.024+elapsed*.32)*4,y);
      }
    }
    if(running&&!reduced)raf=requestAnimationFrame(draw);
  }

  function start(){if(running||reduced)return;running=true;last=0;raf=requestAnimationFrame(draw)}
  function stop(){running=false;if(raf)cancelAnimationFrame(raf);raf=0}
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>entry.isIntersecting?start():stop()),{threshold:.02});
  observer.observe(hero);
  window.addEventListener('resize',resize,{passive:true});
  document.addEventListener('visibilitychange',()=>document.hidden?stop():(hero.getBoundingClientRect().bottom>0&&start()));
  resize();

  if(window.gsap&&window.ScrollTrigger&&!reduced){
    gsap.to(canvas,{yPercent:-8,autoAlpha:0,ease:'none',scrollTrigger:{trigger:hero,start:'top top',end:'bottom 48%',scrub:true}});
  }
})();

// External game links: regular web opens TapTap in the same tab; XHS uses its native route when available.
document.addEventListener('click', function (event) {
  var link = event.target && event.target.closest ? event.target.closest('a.rank-item') : null;
  if (!link) return;
  var href = link.getAttribute('href');
  if (!href || href.indexOf('https://www.taptap.cn/app/') !== 0) return;
  if (window.xhs && window.xhs.miniTool && typeof window.xhs.miniTool.openRedPage === 'function') {
    event.preventDefault();
    var titleNode = link.querySelector('h3');
    var keyword = titleNode ? titleNode.textContent.trim() : href.split('/').pop();
    window.xhs.miniTool.openRedPage({ type: 'search', params: { keyword: keyword } }).catch(function () {
      // Keep the click meaningful even if the host declines the native route.
      window.location.href = href;
    });
  }
});
