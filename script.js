/* ========================================================= 
   GAMING PORTFOLIO ENGINE 
========================================================= */ 
 
document.addEventListener("DOMContentLoaded", () => { 
 
    /* ===================================================== 
       ELEMENTS 
    ====================================================== */ 
 
    const musicButton = 
        document.getElementById("musicButton"); 
 
    const music = 
        document.getElementById("themeMusic"); 
 
    const mobileMenu = 
        document.getElementById("mobileMenu"); 
 
    const mobileNav = 
        document.getElementById("mobileNav"); 
 
    const cursorGlow = 
        document.querySelector(".cursor-glow"); 
 
    const gameCards = 
        document.querySelectorAll(".game-card"); 
 
    const gamePanels = 
        document.querySelectorAll(".game-panel"); 
 
    const modeTabs = 
        document.querySelectorAll(".mode-tab"); 
 
    const gameTitle = 
        document.getElementById("gameTitle"); 
 
    const videoModal = 
        document.getElementById("videoModal"); 
 
    const video = 
        document.getElementById("unlockVideo"); 
 
    const videoClose = 
        document.getElementById("videoClose"); 
 
    const videoButtons = 
        document.querySelectorAll(".video-button"); 
 
    const introScreen = 
        document.getElementById("intro-screen"); 
 
    const introVideo = 
        document.getElementById("intro-video"); 

 
    /* ===================================================== 
       INTRO STATE 
    ====================================================== */ 
 
    let siteStarted = false; 
 
    document.body.classList.add("intro-active"); 
 
 
    /* ===================================================== 
       MUSIC 
    ====================================================== */ 
 
    let musicPlaying = false; 
 
    if (music && musicButton) { 
 
        music.volume = 0.35; 
 
        musicButton.addEventListener("click", async () => { 
 
            try { 
 
                if (!musicPlaying) { 
 
                    await music.play(); 
 
                    musicPlaying = true; 
 
                    musicButton.classList.add( 
                        "playing" 
                    ); 
 
                } else { 
 
                    music.pause(); 
 
                    musicPlaying = false; 
 
                    musicButton.classList.remove( 
                        "playing" 
                    ); 
 
                } 
 
            } catch (error) { 
 
                console.warn( 
                    "Music could not start:", 
                    error 
                ); 
 
            } 
 
        }); 
 
    } 
 
 
    /* ===================================================== 
       MOBILE NAV 
    ====================================================== */ 
 
    if (mobileMenu && mobileNav) { 
 
        mobileMenu.addEventListener("click", () => { 
 
            mobileNav.classList.toggle("open"); 
 
            const spans = 
                mobileMenu.querySelectorAll("span"); 
 
            if ( 
                mobileNav.classList.contains("open") 
            ) { 
 
                spans[0].style.transform = 
                    "translateY(6px) rotate(45deg)"; 
 
                spans[1].style.opacity = "0"; 
 
                spans[2].style.transform = 
                    "translateY(-6px) rotate(-45deg)"; 
 
            } else { 
 
                spans.forEach(span => { 
 
                    span.style.transform = ""; 
                    span.style.opacity = ""; 
 
                }); 
 
            } 
 
        }); 
 
 
        document 
            .querySelectorAll(".mobile-nav a") 
            .forEach(link => { 
 
                link.addEventListener("click", () => { 
 
                    mobileNav.classList.remove( 
                        "open" 
                    ); 
 
                    const spans = 
                        mobileMenu.querySelectorAll( 
                            "span" 
                        ); 
 
                    spans.forEach(span => { 
 
                        span.style.transform = ""; 
                        span.style.opacity = ""; 
 
                    }); 
 
                }); 
 
            }); 
 
    } 
 
 
    /* ===================================================== 
       CURSOR GLOW 
    ====================================================== */ 
 
    if ( 
        cursorGlow && 
        window.matchMedia("(pointer:fine)").matches 
    ) { 
 
        window.addEventListener( 
            "mousemove", 
            event => { 
 
                cursorGlow.style.left = 
                    `${event.clientX}px`; 
 
                cursorGlow.style.top = 
                    `${event.clientY}px`; 
 
            } 
        ); 
 
    } else if (cursorGlow) { 
 
        cursorGlow.style.display = 
            "none"; 
 
    } 
 
 
    /* ===================================================== 
       SCROLL REVEAL 
    ====================================================== */ 
 
    const revealObserver = 
        new IntersectionObserver( 
            entries => { 
 
                entries.forEach(entry => { 
 
                    if ( 
                        entry.isIntersecting 
                    ) { 
 
                        entry.target.classList.add( 
                            "visible" 
                        ); 
 
                    } 
 
                }); 
 
            }, 
            { 
                threshold: .12 
            } 
        ); 
 
 
    function observeElements(root = document) { 
 
        if (!root) return; 
 
        root 
            .querySelectorAll( 
                ".reveal, .graph-card, .progress-card" 
            ) 
            .forEach(element => { 
 
                revealObserver.observe( 
                    element 
                ); 
 
            }); 
 
    } 
 
 
    /* ===================================================== 
       COUNTER ANIMATION 
    ====================================================== */ 
 
    const animatedCounters = 
        new WeakSet(); 
 
 
    function animateCounters(root = document) { 
 
        if (!root || !siteStarted) return; 
 
        root 
            .querySelectorAll( 
                "[data-count]" 
            ) 
            .forEach(counter => { 
 
                if ( 
                    animatedCounters.has( 
                        counter 
                    ) 
                ) { 
                    return; 
                } 
 
                const target = 
                    Number( 
                        counter.dataset.count 
                    ); 
 
                if ( 
                    Number.isNaN(target) 
                ) { 
                    return; 
                } 
 
                animatedCounters.add( 
                    counter 
                ); 
 
                let start = 0; 
 
                const duration = 
                    1300; 
 
                const startTime = 
                    performance.now(); 
 
 
                function update(currentTime) { 
 
                    const progress = 
                        Math.min( 
                            ( 
                                currentTime - 
                                startTime 
                            ) / duration, 
                            1 
                        ); 
 
 
                    const eased = 
                        1 - 
                        Math.pow( 
                            1 - progress, 
                            3 
                        ); 
 
 
                    start = 
                        Math.floor( 
                            target * 
                            eased 
                        ); 
 
 
                    counter.textContent = 
                        start.toLocaleString(); 
 
 
                    if ( 
                        progress < 1 
                    ) { 
 
                        requestAnimationFrame( 
                            update 
                        ); 
 
                    } else { 
 
                        counter.textContent = 
                            target.toLocaleString(); 
 
                    } 
 
                } 
 
 
                requestAnimationFrame( 
                    update 
                ); 
 
            }); 
 
    } 
 
 
    /* ===================================================== 
       PROGRESS VALUES 
    ====================================================== */ 
 
    document 
        .querySelectorAll( 
            ".progress-fill" 
        ) 
        .forEach(element => { 
 
            const value = 
                Number( 
                    element.dataset.progress 
                ); 
 
            element.style.setProperty( 
                "--progress-value", 
                value 
            ); 
 
        }); 
 
 
    /* ===================================================== 
       GAME SWITCHING 
    ====================================================== */ 
 
    const gameNames = { 
 
        delta: 
            "DELTA FORCE", 
 
        codm: 
            "CALL OF DUTY MOBILE", 
 
        asphalt: 
            "ASPHALT 9" 
 
    }; 
 
 
    gameCards.forEach(card => { 
 
        card.addEventListener("click", () => { 
 
            const game = 
                card.dataset.game; 
 
 
            gameCards.forEach(item => { 
 
                item.classList.remove( 
                    "active" 
                ); 
 
            }); 
 
 
            card.classList.add( 
                "active" 
            ); 
 
 
            gamePanels.forEach(panel => { 
 
                panel.classList.remove( 
                    "active" 
                ); 
 
            }); 
 
 
            const selectedPanel = 
                document.getElementById( 
                    `${game}Panel` 
                ); 
 
 
            if (selectedPanel) { 
 
                selectedPanel.classList.add( 
                    "active" 
                ); 
 
            } 
 
 
            if (gameTitle) { 
 
                gameTitle.textContent = 
                    gameNames[game] || 
                    game.toUpperCase(); 
 
            } 
 
 
            setTimeout(() => { 
 
                animateCounters( 
                    selectedPanel 
                ); 
 
                observeElements( 
                    selectedPanel 
                ); 
 
            }, 100); 
 
        }); 
 
    }); 
 
 
    /* ===================================================== 
       MODE SWITCHING 
    ====================================================== */ 
 
    modeTabs.forEach(tab => { 
 
        tab.addEventListener("click", () => { 
 
            const mode = 
                tab.dataset.mode; 
 
 
            const parentPanel = 
                tab.closest(".game-panel"); 
 
 
            if (!parentPanel) return; 
 
 
            parentPanel 
                .querySelectorAll(".mode-tab") 
                .forEach(item => { 
 
                    item.classList.remove( 
                        "active" 
                    ); 
 
                }); 
 
 
            tab.classList.add( 
                "active" 
            ); 
 
 
            parentPanel 
                .querySelectorAll(".mode-panel") 
                .forEach(panel => { 
 
                    panel.classList.remove( 
                        "active" 
                    ); 
 
                }); 
 
 
            const selectedMode = 
                document.getElementById( 
                    mode 
                ); 
 
 
            if (selectedMode) { 
 
                selectedMode.classList.add( 
                    "active" 
                ); 
 
                animateCounters( 
                    selectedMode 
                ); 
 
                observeElements( 
                    selectedMode 
                ); 
 
            } 
 
        }); 
 
    }); 
 
 
    /* ===================================================== 
       VIDEO MODAL 
    ====================================================== */ 
 
    videoButtons.forEach(button => { 
 
        button.addEventListener( 
            "click", 
            () => { 
 
                const source = 
                    button.dataset.video; 
 
                if (!source || !video) return; 
 
                video.src = 
                    source; 
 
                videoModal.classList.add( 
                    "active" 
                ); 
 
                document.body.style.overflow = 
                    "hidden"; 
 
                video.currentTime = 0; 
 
                video.play().catch(() => {}); 
 
            } 
        ); 
 
    }); 
 
 
    function closeVideo() { 
 
        if (!video || !videoModal) return; 
 
        video.pause(); 
 
        video.removeAttribute( 
            "src" 
        ); 
 
        video.load(); 
 
        videoModal.classList.remove( 
            "active" 
        ); 
 
        document.body.style.overflow = 
            ""; 
 
    } 
 
 
    if (videoClose) { 
 
        videoClose.addEventListener( 
            "click", 
            closeVideo 
        ); 
 
    } 
 
 
    if (videoModal) { 
 
        videoModal.addEventListener( 
            "click", 
            event => { 
 
                if ( 
                    event.target === 
                    videoModal 
                ) { 
 
                    closeVideo(); 
 
                } 
 
            } 
        ); 
 
    } 
 
 
    document.addEventListener( 
        "keydown", 
        event => { 
 
            if ( 
                event.key === "Escape" 
            ) { 
 
                closeVideo(); 
 
            } 
 
        } 
    ); 
 
 
    /* ===================================================== 
       NAV ACTIVE STATE 
    ====================================================== */ 
 
    const sections = 
        document.querySelectorAll( 
            "section[id]" 
        ); 
 
    const navLinks = 
        document.querySelectorAll( 
            ".desktop-nav a" 
        ); 
 
 
    const navObserver = 
        new IntersectionObserver( 
            entries => { 
 
                entries.forEach(entry => { 
 
                    if ( 
                        entry.isIntersecting 
                    ) { 
 
                        navLinks.forEach( 
                            link => { 
 
                                link.classList.remove( 
                                    "active" 
                                ); 
 
                                if ( 
                                    link.getAttribute( 
                                        "href" 
                                    ) === 
                                    `#${entry.target.id}` 
                                ) { 
 
                                    link.classList.add( 
                                        "active" 
                                    ); 
 
                                } 
 
                            } 
                        ); 
 
                    } 
 
                }); 
 
            }, 
            { 
                threshold: .4 
            } 
        ); 
 
 
    sections.forEach(section => { 
 
        navObserver.observe( 
            section 
        ); 
 
    }); 
 
 
    /* ===================================================== 
       BUTTON MICRO INTERACTION 
    ====================================================== */ 
 
    document 
        .querySelectorAll( 
            "button, .primary-button, .secondary-button" 
        ) 
        .forEach(button => { 
 
            button.addEventListener( 
                "pointerdown", 
                () => { 
 
                    button.style.transform = 
                        "scale(.97)"; 
 
                } 
            ); 
 
            button.addEventListener( 
                "pointerup", 
                () => { 
 
                    button.style.transform = 
                        ""; 
 
                } 
            ); 
 
            button.addEventListener( 
                "pointerleave", 
                () => { 
 
                    button.style.transform = 
                        ""; 
 
                } 
 
            ); 
 
        }); 
 
 
    /* ===================================================== 
       START WEBSITE 
    ====================================================== */ 
 
    function startWebsite() { 
 
        if (siteStarted) return; 
 
        siteStarted = true; 
 
        /* 
           Add this first so the CSS hero animations 
           start from their original animation state. 
        */ 
 
        document.body.classList.add( 
            "site-started" 
        ); 
 
        /* 
           Remove animation lock. 
        */ 
 
        document.body.classList.remove( 
            "intro-active" 
        ); 
 
 
        /* 
           Start scroll reveal only now. 
        */ 
 
        observeElements(); 
 
 
        /* 
           Start counters only now. 
        */ 
 
        const initialPanel = 
            document.getElementById( 
                "delta-warfare" 
            ); 
 
        if (initialPanel) { 
 
            animateCounters( 
                initialPanel 
            ); 
 
        } 
 
 
        /* 
           Start intro fade-out. 
        */ 
 
        if (introScreen) { 
 
            introScreen.classList.add( 
                "finished" 
            ); 
 
        } 
 
    } 
 
 
    /* ===================================================== 
       INTRO VIDEO CONTROL 
    ====================================================== */ 
 
    if ( 
        introScreen && 
        introVideo 
    ) { 
 
        /* 
           Ensure video starts from the beginning. 
        */ 
 
        try { 
            introVideo.currentTime = 0; 
        } catch (error) { 
            console.warn( 
                "Intro video position could not be reset:", 
                error 
            ); 
        } 
 
 
        /* 
           When the video finishes, 
           ONLY THEN start the website. 
        */ 
 
        introVideo.addEventListener( 
            "ended", 
            startWebsite, 
            { 
                once: true 
            } 
        ); 
 
 
        /* 
           Explicitly attempt autoplay. 
           The video is muted + playsinline, 
           so modern mobile browsers normally allow it. 
        */ 
 
        const playIntro = 
            introVideo.play(); 
 
        if (playIntro !== undefined) { 
 
            playIntro.catch(error => { 
 
                console.warn( 
                    "Intro video autoplay was blocked:", 
                    error 
                ); 
 
            }); 
 
        } 
 
    } else { 
 
        /* 
           If the intro elements are missing, 
           don't leave the website permanently locked. 
        */ 
 
        startWebsite(); 
 
    } 
 
 
/* ========================================================= 
   WEAPON DETAILS SYSTEM 
   SAFE / ISOLATED / ALL MODES 
========================================================= */ 
 
/* ========================================================= 
   WEAPON DATABASE 
========================================================= */ 
 
const weaponData = { 
 
    /* ========================= 
       DELTA FORCE // WARFARE 
    ========================= */ 
 
    "delta-weapon-1": { 
        name: "WEAPON ALPHA", 
        category: "ASSAULT RIFLE", 
        video: "assets/delta/weapon-1.mp4", 
 
        code: "AK-12 Assault Rifle-Warfare-6L7IUBO073PH38PM48POV", 
 
        stats: { 
            damage: "24", 
            range: "35 M", 
            control: "70", 
            handling: "14", 
            stability: "79", 
            accuracy: "46", 
            fireRate: "735 RPM", 
            capacity: "75", 
            modes: "SINGLE / BURST / AUTO", 
            muzzleVelocity: "633 M/S" 
        }, 
 
        attachments: [ 
            "OPTIC // VMX Frameless Sight", 
            "MUZZLE // M7 Practical Supressor", 
            "MAGAZINE // AKS-74 75 Round Polymer Drum Mag", 
            "STOCK // 416 Stable Stock", 
            "BARREL // AK-12 Elite Bipod Long Barrel", 
            "UPPER RAIL // DBAL-X2 Purle Laser-Light Combo", 
            "LOWER RAIL // LOWER RAIL", 
            "LEFT RAIL // PEQ-2 Red Laser-Light Combo", 
            "RIGHT RAIL // PEQ-2 Red Laser-Light Combo", 
            "FOREGRIP // Phase Combat Forgrip", 
            "REARGRIP // AK Heavy Tower Barrel", 
            "UPPER PATCH // DD Python Handguard Panel", 
            "LEFT PATCH // DD Python Handguard Panel", 
            "RIGHT PATCH // DD Python Handguard Panel", 
            "TACTICAL RISER // MEO Micro Sight Riser", 
            "GRIP MOUNT // Stable Grip Base" 
        ] 
    }, 
 
    "delta-weapon-2": { 
        name: "WEAPON BETA", 
        category: "BATTLE RIFLE", 
        video: "assets/delta/weapon-2.mp4", 
 
        code: "YOUR-DELTA-WEAPON-2-CODE", 
 
        stats: { 
            damage: "91", 
            range: "88", 
            control: "72", 
            handling: "69", 
            stability: "75", 
            accuracy: "90", 
            fireRate: "61", 
            capacity: "20", 
            modes: "AUTO / SEMI", 
            muzzleVelocity: "870 M/S" 
        }, 
 
        attachments: [ 
            "OPTIC // HOLO", 
            "MUZZLE // FLASH HIDER", 
            "BARREL // HEAVY BARREL", 
            "UNDERBARREL // ANGLED GRIP", 
            "MAGAZINE // FAST MAG" 
        ] 
    }, 
 
    "delta-weapon-3": { 
        name: "WEAPON GAMMA", 
        category: "SMG", 
        video: "assets/delta/weapon-3.mp4", 
 
        code: "YOUR-DELTA-WEAPON-3-CODE", 
 
        stats: { 
            damage: "68", 
            range: "61", 
            control: "91", 
            handling: "95", 
            stability: "82", 
            accuracy: "79", 
            fireRate: "96", 
            capacity: "40", 
            modes: "AUTO / BURST", 
            muzzleVelocity: "780 M/S" 
        }, 
 
        attachments: [ 
            "OPTIC // MINI RED DOT", 
            "MUZZLE // SUPPRESSOR", 
            "LASER // TACTICAL LASER", 
            "MAGAZINE // 40 ROUND", 
            "REAR GRIP // QUICK GRIP" 
        ] 
    }, 
 
 
    /* ========================= 
       DELTA FORCE // OPERATIONS 
    ========================= */ 
 
    "delta-operations-weapon-1": { 
        name: "WEAPON ALPHA", 
        category: "ASSAULT RIFLE", 
        video: "assets/delta/operations-weapon-1.mp4", 
 
        code: "YOUR-DELTA-OPERATIONS-WEAPON-1-CODE", 
 
        stats: { 
            damage: "84", 
            range: "81", 
            control: "85", 
            handling: "79", 
            stability: "87", 
            accuracy: "86", 
            fireRate: "74", 
            capacity: "30", 
            modes: "AUTO / SEMI", 
            muzzleVelocity: "895 M/S" 
        }, 
 
        attachments: [ 
            "OPTIC // HOLO", 
            "MUZZLE // COMPENSATOR", 
            "BARREL // PRECISION BARREL", 
            "UNDERBARREL // VERTICAL GRIP", 
            "MAGAZINE // EXTENDED" 
        ] 
    }, 
 
    "delta-operations-weapon-2": { 
        name: "WEAPON BETA", 
        category: "MARKSMAN RIFLE", 
        video: "assets/delta/operations-weapon-2.mp4", 
 
        code: "YOUR-DELTA-OPERATIONS-WEAPON-2-CODE", 
 
        stats: { 
            damage: "95", 
            range: "97", 
            control: "67", 
            handling: "62", 
            stability: "79", 
            accuracy: "96", 
            fireRate: "49", 
            capacity: "15", 
            modes: "SEMI", 
            muzzleVelocity: "1020 M/S" 
        }, 
 
        attachments: [ 
            "OPTIC // 4X SCOPE", 
            "MUZZLE // SUPPRESSOR", 
            "BARREL // LONG BARREL", 
            "STOCK // PRECISION STOCK", 
            "MAGAZINE // EXTENDED" 
        ] 
    }, 
 
    "delta-operations-weapon-3": { 
        name: "WEAPON GAMMA", 
        category: "LMG", 
        video: "assets/delta/operations-weapon-3.mp4", 
 
        code: "YOUR-DELTA-OPERATIONS-WEAPON-3-CODE", 
 
        stats: { 
            damage: "89", 
            range: "84", 
            control: "64", 
            handling: "52", 
            stability: "76", 
            accuracy: "73", 
            fireRate: "82", 
            capacity: "75", 
            modes: "AUTO", 
            muzzleVelocity: "820 M/S" 
        }, 
 
        attachments: [ 
            "OPTIC // 2X SCOPE", 
            "MUZZLE // COMPENSATOR", 
            "UNDERBARREL // HEAVY GRIP", 
            "MAGAZINE // DRUM", 
            "STOCK // REINFORCED" 
        ] 
    }, 
 
 
    /* ========================= 
       CODM // MULTIPLAYER 
    ========================= */ 
 
    "mp-weapon-1": { 
        name: "WEAPON ALPHA", 
        category: "ASSAULT RIFLE", 
        video: "assets/codm/mp-weapon-1.mp4", 
 
        code: "YOUR-CODM-MP-WEAPON-1-CODE", 
 
        stats: { 
            damage: "86", 
            range: "82", 
            control: "89", 
            handling: "84", 
            stability: "91", 
            accuracy: "87", 
            fireRate: "79", 
            capacity: "30", 
            modes: "AUTO / SEMI", 
            muzzleVelocity: "910 M/S" 
        }, 
 
        attachments: [ 
            "OPTIC // RED DOT", 
            "MUZZLE // MONOLITHIC SUPPRESSOR", 
            "BARREL // EXTENDED BARREL", 
            "UNDERBARREL // OPERATOR GRIP", 
            "MAGAZINE // EXTENDED MAG" 
        ] 
    }, 
 
    "mp-weapon-2": { 
        name: "WEAPON BETA", 
        category: "SMG", 
        video: "assets/codm/mp-weapon-2.mp4", 
 
        code: "YOUR-CODM-MP-WEAPON-2-CODE", 
 
        stats: { 
            damage: "72", 
            range: "66", 
            control: "93", 
            handling: "97", 
            stability: "86", 
            accuracy: "82", 
            fireRate: "98", 
            capacity: "40", 
            modes: "AUTO", 
            muzzleVelocity: "790 M/S" 
        }, 
 
        attachments: [ 
            "OPTIC // MICRO RED DOT", 
            "MUZZLE // SUPPRESSOR", 
            "LASER // OWC LASER", 
            "MAGAZINE // FAST MAG", 
            "REAR GRIP // GRANULATED GRIP" 
        ] 
    }, 
 
    "mp-weapon-3": { 
        name: "WEAPON GAMMA", 
        category: "SNIPER RIFLE", 
        video: "assets/codm/mp-weapon-3.mp4", 
 
        code: "YOUR-CODM-MP-WEAPON-3-CODE", 
 
        stats: { 
            damage: "99", 
            range: "100", 
            control: "61", 
            handling: "58", 
            stability: "80", 
            accuracy: "99", 
            fireRate: "42", 
            capacity: "5", 
            modes: "BOLT ACTION", 
            muzzleVelocity: "1100 M/S" 
        }, 
 
        attachments: [ 
            "OPTIC // 6X TACTICAL", 
            "MUZZLE // SUPPRESSOR", 
            "BARREL // LONG RANGE", 
            "STOCK // STABILITY STOCK", 
            "AMMO // HIGH VELOCITY" 
        ] 
    }, 
 
 
    /* ========================= 
       CODM // BATTLE ROYALE 
    ========================= */ 
 
    "br-weapon-1": { 
        name: "WEAPON ALPHA", 
        category: "ASSAULT RIFLE", 
        video: "assets/codm/br-weapon-1.mp4", 
 
        code: "YOUR-CODM-BR-WEAPON-1-CODE", 
 
        stats: { 
            damage: "85", 
            range: "86", 
            control: "88", 
            handling: "82", 
            stability: "89", 
            accuracy: "85", 
            fireRate: "77", 
            capacity: "30", 
            modes: "AUTO / SEMI", 
            muzzleVelocity: "900 M/S" 
        }, 
 
        attachments: [ 
            "OPTIC // HOLO", 
            "MUZZLE // COMPENSATOR", 
            "BARREL // EXTENDED", 
            "UNDERBARREL // ANGLED GRIP", 
            "MAGAZINE // 40 ROUND" 
        ] 
    }, 
 
    "br-weapon-2": { 
        name: "WEAPON BETA", 
        category: "LMG", 
        video: "assets/codm/br-weapon-2.mp4", 
 
        code: "YOUR-CODM-BR-WEAPON-2-CODE", 
 
        stats: { 
            damage: "90", 
            range: "83", 
            control: "70", 
            handling: "57", 
            stability: "78", 
            accuracy: "76", 
            fireRate: "84", 
            capacity: "75", 
            modes: "AUTO", 
            muzzleVelocity: "830 M/S" 
        }, 
 
        attachments: [ 
            "OPTIC // 2X", 
            "MUZZLE // COMPENSATOR", 
            "BARREL // HEAVY", 
            "UNDERBARREL // FOREGRIP", 
            "MAGAZINE // DRUM" 
        ] 
    }, 
 
    "br-weapon-3": { 
        name: "WEAPON GAMMA", 
        category: "SNIPER RIFLE", 
        video: "assets/codm/br-weapon-3.mp4", 
 
        code: "YOUR-CODM-BR-WEAPON-3-CODE", 
 
        stats: { 
            damage: "100", 
            range: "100", 
            control: "55", 
            handling: "51", 
            stability: "78", 
            accuracy: "98", 
            fireRate: "39", 
            capacity: "5", 
            modes: "BOLT ACTION", 
            muzzleVelocity: "1080 M/S" 
        }, 
 
        attachments: [ 
            "OPTIC // 6X", 
            "MUZZLE // SUPPRESSOR", 
            "BARREL // LONG RANGE", 
            "STOCK // PRECISION", 
            "AMMO // HIGH VELOCITY" 
        ] 
    }, 
 
 
    /* ========================= 
       CODM // DMZ 
    ========================= */ 
 
    "dmz-weapon-1": { 
        name: "WEAPON ALPHA", 
        category: "ASSAULT RIFLE", 
        video: "assets/codm/dmz-weapon-1.mp4", 
 
        code: "YOUR-CODM-DMZ-WEAPON-1-CODE", 
 
        stats: { 
            damage: "88", 
            range: "90", 
            control: "84", 
            handling: "78", 
            stability: "87", 
            accuracy: "91", 
            fireRate: "73", 
            capacity: "30", 
            modes: "AUTO / SEMI", 
            muzzleVelocity: "920 M/S" 
        }, 
 
        attachments: [ 
            "OPTIC // HOLO", 
            "MUZZLE // SUPPRESSOR", 
            "BARREL // LONG BARREL", 
            "UNDERBARREL // VERTICAL GRIP", 
            "MAGAZINE // EXTENDED" 
        ] 
    }, 
 
    "dmz-weapon-2": { 
        name: "WEAPON BETA", 
        category: "BATTLE RIFLE", 
        video: "assets/codm/dmz-weapon-2.mp4", 
 
        code: "YOUR-CODM-DMZ-WEAPON-2-CODE", 
 
        stats: { 
            damage: "94", 
            range: "92", 
            control: "69", 
            handling: "64", 
            stability: "76", 
            accuracy: "93", 
            fireRate: "57", 
            capacity: "20", 
            modes: "AUTO / SEMI", 
            muzzleVelocity: "950 M/S" 
        }, 
 
        attachments: [ 
            "OPTIC // 3X", 
            "MUZZLE // COMPENSATOR", 
            "BARREL // HEAVY", 
            "UNDERBARREL // GRIP", 
            "MAGAZINE // EXTENDED" 
        ] 
    }, 
 
    "dmz-weapon-3": { 
        name: "WEAPON GAMMA", 
        category: "SMG", 
        video: "assets/codm/dmz-weapon-3.mp4", 
 
        code: "YOUR-CODM-DMZ-WEAPON-3-CODE", 
 
        stats: { 
            damage: "70", 
            range: "64", 
            control: "92", 
            handling: "94", 
            stability: "84", 
            accuracy: "81", 
            fireRate: "97", 
            capacity: "45", 
            modes: "AUTO", 
            muzzleVelocity: "775 M/S" 
        }, 
 
        attachments: [ 
            "OPTIC // MINI DOT", 
            "MUZZLE // SUPPRESSOR", 
            "LASER // TACTICAL", 
            "MAGAZINE // 45 ROUND", 
            "REAR GRIP // QUICK GRIP" 
        ] 
    }, 
 
 
    /* ========================= 
       CODM // ZOMBIES 
    ========================= */ 
 
    "zombies-weapon-1": { 
        name: "WEAPON ALPHA", 
        category: "ASSAULT RIFLE", 
        video: "assets/codm/zombies-weapon-1.mp4", 
 
        code: "YOUR-CODM-ZOMBIES-WEAPON-1-CODE", 
 
        stats: { 
            damage: "91", 
            range: "80", 
            control: "87", 
            handling: "80", 
            stability: "92", 
            accuracy: "86", 
            fireRate: "76", 
            capacity: "40", 
            modes: "AUTO / SEMI", 
            muzzleVelocity: "890 M/S" 
        }, 
 
        attachments: [ 
            "OPTIC // HOLO", 
            "MUZZLE // SUPPRESSOR", 
            "BARREL // ZOMBIE HUNTER", 
            "UNDERBARREL // HEAVY GRIP", 
            "MAGAZINE // 40 ROUND" 
        ] 
    }, 
 
    "zombies-weapon-2": { 
        name: "WEAPON BETA", 
        category: "LMG", 
        video: "assets/codm/zombies-weapon-2.mp4", 
 
        code: "YOUR-CODM-ZOMBIES-WEAPON-2-CODE", 
 
        stats: { 
            damage: "94", 
            range: "82", 
            control: "66", 
            handling: "55", 
            stability: "81", 
            accuracy: "74", 
            fireRate: "88", 
            capacity: "100", 
            modes: "AUTO", 
            muzzleVelocity: "810 M/S" 
        }, 
 
        attachments: [ 
            "OPTIC // 2X", 
            "MUZZLE // COMPENSATOR", 
            "BARREL // HEAVY", 
            "UNDERBARREL // STABILIZER", 
            "MAGAZINE // DRUM" 
        ] 
    }, 
 
    "zombies-weapon-3": { 
        name: "WEAPON GAMMA", 
        category: "SHOTGUN", 
        video: "assets/codm/zombies-weapon-3.mp4", 
 
        code: "YOUR-CODM-ZOMBIES-WEAPON-3-CODE", 
 
        stats: { 
            damage: "98", 
            range: "58", 
            control: "72", 
            handling: "83", 
            stability: "75", 
            accuracy: "68", 
            fireRate: "63", 
            capacity: "8", 
            modes: "PUMP ACTION", 
            muzzleVelocity: "620 M/S" 
        }, 
 
        attachments: [ 
            "OPTIC // REFLEX", 
            "MUZZLE // CHOKE", 
            "BARREL // EXTENDED", 
            "STOCK // TACTICAL", 
            "AMMO // INCENDIARY" 
        ] 
    } 
 
}; 
 
 
/* ========================================================= 
   CREATE MODAL 
========================================================= */ 
 
const weaponModal = document.createElement("div"); 
 
weaponModal.className = "weapon-modal"; 
 
weaponModal.innerHTML = ` 
 
    <div class="weapon-modal-inner"> 
 
        <button 
            class="weapon-modal-close" 
            type="button" 
            aria-label="Close weapon details" 
        > 
            × 
        </button> 
 
        <div class="weapon-modal-header"> 
 
            <span class="weapon-modal-label"> 
                WEAPON DATABASE // 001 
            </span> 
 
            <h2 id="weaponModalTitle"> 
                WEAPON 
            </h2> 
 
            <p id="weaponModalCategory"> 
                PRIMARY 
            </p> 
 
        </div> 
 
 
        <div class="weapon-preview"> 
 
            <video 
                id="weaponPreviewVideo" 
                muted 
                loop 
                playsinline 
                controls 
            ></video> 
 
        </div> 
 
 
        <div class="weapon-details"> 
 
            <div class="weapon-details-heading"> 
 
                <span> 
                    PERFORMANCE DATA 
                </span> 
 
                <h3> 
                    WEAPON SPECIFICATIONS 
                </h3> 
 
            </div> 
 
            <div 
                class="weapon-stat-grid" 
                id="weaponStatGrid" 
            ></div> 
 
            <div class="weapon-code-box"> 
 
                <div class="weapon-details-heading"> 
 
                    <span> 
                        LOADOUT // IMPORT CODE 
                    </span> 
 
                    <h3> 
                        GUN CODE 
                    </h3> 
 
                </div> 
 
                <div class="weapon-code-row"> 
 
                    <input 
                        type="text" 
                        id="weaponCodeInput" 
                        readonly 
                        value="" 
                        aria-label="Weapon loadout code" 
                    > 
 
                    <button 
                        type="button" 
                        id="weaponCodeCopy" 
                    > 
                        COPY CODE 
                    </button> 
 
                </div> 
 
                <span 
                    class="weapon-code-status" 
                    id="weaponCodeStatus" 
                > 
                    READY TO COPY 
                </span> 
 
            </div> 
 
            <div class="weapon-attachments"> 
 
                <div class="weapon-details-heading"> 
 
                    <span> 
                        LOADOUT // CONFIGURATION 
                    </span> 
 
                    <h3> 
                        ATTACHMENTS USED 
                    </h3> 
 
                </div> 
 
                <div 
                    class="attachment-list" 
                    id="weaponAttachmentList" 
                ></div> 
 
            </div> 
 
        </div> 
 
    </div> 
 
`; 
 
 
/* ========================================================= 
   ADD MODAL TO PAGE 
========================================================= */ 
 
document.body.appendChild(weaponModal); 
 
 
/* ========================================================= 
   MODAL ELEMENTS 
========================================================= */ 
 
const weaponModalTitle = 
    weaponModal.querySelector("#weaponModalTitle"); 
 
const weaponModalCategory = 
    weaponModal.querySelector("#weaponModalCategory"); 
 
const weaponPreviewVideo = 
    weaponModal.querySelector("#weaponPreviewVideo"); 
 
const weaponStatGrid = 
    weaponModal.querySelector("#weaponStatGrid"); 
 
const weaponAttachmentList = 
    weaponModal.querySelector("#weaponAttachmentList"); 
 
const weaponCodeInput = 
    weaponModal.querySelector("#weaponCodeInput"); 
 
const weaponCodeCopy = 
    weaponModal.querySelector("#weaponCodeCopy"); 
 
const weaponCodeStatus = 
    weaponModal.querySelector("#weaponCodeStatus"); 
 
const weaponModalClose = 
    weaponModal.querySelector(".weapon-modal-close"); 
 
 
/* ========================================================= 
   FORMAT STAT NAME 
========================================================= */ 
 
function formatWeaponStatName(name) { 
 
    const names = { 
 
        damage: "DAMAGE", 
        range: "RANGE", 
        control: "CONTROL", 
        handling: "HANDLING", 
        stability: "STABILITY", 
        accuracy: "ACCURACY", 
        fireRate: "FIRE RATE", 
        capacity: "CAPACITY", 
        modes: "MODES", 
        muzzleVelocity: "MUZZLE VELOCITY" 
 
    }; 
 
    return names[name] || name.toUpperCase(); 
 
} 
 
 
/* ========================================================= 
   STAT BAR VALUE 
========================================================= */ 
 
function getStatPercentage(value) { 
 
    const numeric = parseFloat( 
        String(value).replace(/[^\d.]/g, "") 
    ); 
 
    if (Number.isNaN(numeric)) { 
        return 100; 
    } 
 
    return Math.min(numeric, 100); 
 
} 
 
 
/* ========================================================= 
   GET WEAPON KEY 
========================================================= */ 
 
function getWeaponKey(card) { 
 
    const image = card.querySelector("img"); 
 
    if (!image) { 
        return null; 
    } 
 
    const src = 
        image.getAttribute("src") || ""; 
 
    const fileName = 
        src 
            .split("/") 
            .pop() 
            .split("?")[0] 
            .replace(/\.[^/.]+$/, ""); 
 
    /* 
       DELTA: 
 
       weapon-1 
       becomes 
       delta-weapon-1 
 
       operations-weapon-1 
       becomes 
       delta-operations-weapon-1 
    */ 
 
    if (src.includes("assets/delta/")) { 
 
        return `delta-${fileName}`; 
 
    } 
 
    /* 
       CODM keys already match 
       their filenames. 
    */ 
 
    if (src.includes("assets/codm/")) { 
 
        return fileName; 
 
    } 
 
    return fileName; 
 
} 
 
 
/* ========================================================= 
   OPEN WEAPON MODAL 
========================================================= */ 
 
function openWeaponDetails(card) { 
 
    if (!card) return; 
 
    const weaponKey = 
        getWeaponKey(card); 
 
    if (!weaponKey) { 
 
        console.warn( 
            "Could not determine weapon key." 
        ); 
 
        return; 
 
    } 
 
    const data = 
        weaponData[weaponKey]; 
 
    if (!data) { 
 
        console.error( 
            "Weapon data not found:", 
            weaponKey 
        ); 
 
        return; 
 
    } 
 
 
    /* ===================================================== 
       WEAPON LOADOUT CODE 
    ====================================================== */ 
 
    if (weaponCodeInput) { 
 
        weaponCodeInput.value = 
            data.code || "NO CODE ADDED"; 
 
    } 
 
    if (weaponCodeStatus) { 
 
        weaponCodeStatus.textContent = 
            data.code 
                ? "READY TO COPY" 
                : "NO CODE AVAILABLE"; 
 
    } 
 
 
    /* ===================================================== 
       TITLE 
    ====================================================== */ 
 
    weaponModalTitle.textContent = 
        data.name; 
 
    weaponModalCategory.textContent = 
        data.category; 
 
 
    /* ===================================================== 
       VIDEO RESET 
    ====================================================== */ 
 
    weaponPreviewVideo.pause(); 
 
    weaponPreviewVideo.removeAttribute( 
        "src" 
    ); 
 
    weaponPreviewVideo.load(); 
 
 
    /* ===================================================== 
       VIDEO SOURCE 
    ====================================================== */ 
 
    if (data.video) { 
 
        weaponPreviewVideo.src = 
            data.video; 
 
        weaponPreviewVideo.load(); 
 
    } 
 
 
    /* ===================================================== 
       BUILD STATS 
    ====================================================== */ 
 
    weaponStatGrid.innerHTML = ""; 
 
 
    Object.entries(data.stats) 
        .forEach(([name, value]) => { 
 
            const stat = 
                document.createElement("div"); 
 
            stat.className = 
                "weapon-stat"; 
 
 
            const percentage = 
                getStatPercentage(value); 
 
 
            stat.innerHTML = ` 
 
                <div class="weapon-stat-top"> 
 
                    <span> 
                        ${formatWeaponStatName(name)} 
                    </span> 
 
                    <strong> 
                        ${value} 
                    </strong> 
 
                </div> 
 
                <div class="weapon-stat-bar"> 
 
                    <span 
                        style="--stat-value:${percentage}%" 
                    ></span> 
 
                </div> 
 
            `; 
 
 
            weaponStatGrid.appendChild( 
                stat 
            ); 
 
        }); 
 
 
/* ===================================================== 
   BUILD ATTACHMENTS 
====================================================== */ 
 
weaponAttachmentList.innerHTML = ""; 
 
 
/* ===================================================== 
   DELTA FORCE ATTACHMENT ICON SYSTEM 
====================================================== */ 
 
function getAttachmentIcon(attachment) { 
 
    const text = 
        String(attachment).toUpperCase(); 
 
 
    /* ================================================= 
       BARREL 
    ================================================= */ 
 
    if ( 
        text.includes("BARREL") || 
        text.includes("LONG BARREL") || 
        text.includes("HEAVY BARREL") || 
        text.includes("SHORT BARREL") 
    ) { 
 
        return ` 
            <svg viewBox="0 0 24 24" aria-hidden="true"> 
                <path d="M3 9h17v6H3z"></path> 
                <path d="M20 10v4"></path> 
                <path d="M6 9v6M9 9v6M12 9v6"></path> 
            </svg> 
        `; 
 
    } 
 
 
    /* ================================================= 
       UPPER / LOWER / LEFT / RIGHT RAIL 
    ================================================= */ 
 
    if ( 
        text.includes("UPPER RAIL") || 
        text.includes("LOWER RAIL") || 
        text.includes("LEFT RAIL") || 
        text.includes("RIGHT RAIL") 
    ) { 
 
        return ` 
            <svg viewBox="0 0 24 24" aria-hidden="true"> 
                <rect x="4" y="7" width="16" height="10" rx="1"></rect> 
                <path d="M7 7v10M10 7v10M13 7v10M16 7v10"></path> 
            </svg> 
        `; 
 
    } 
 
 
    /* ================================================= 
       MUZZLE 
    ================================================= */ 
 
    if ( 
        text.includes("MUZZLE") || 
        text.includes("SUPPRESSOR") || 
        text.includes("COMPENSATOR") || 
        text.includes("FLASH HIDER") || 
        text.includes("MUZZLE BRAKE") || 
        text.includes("CHOKE") 
    ) { 
 
        return ` 
            <svg viewBox="0 0 24 24" aria-hidden="true"> 
                <path d="M3 9h13l5 3-5 3H3z"></path> 
                <path d="M7 9v6M10 9v6M13 9v6"></path> 
            </svg> 
        `; 
 
    } 
 
 
    /* ================================================= 
       RAIL BIPOD 
    ================================================= */ 
 
    if ( 
        text.includes("RAIL BIPOD") || 
        text.includes("BIPOD") 
    ) { 
 
        return ` 
            <svg viewBox="0 0 24 24" aria-hidden="true"> 
                <path d="M5 7h14"></path> 
                <path d="M12 7v5"></path> 
                <path d="M12 12L7 20"></path> 
                <path d="M12 12l5 8"></path> 
                <path d="M5 20h4M15 20h4"></path> 
            </svg> 
        `; 
 
    } 
 
 
    /* ================================================= 
       FOREGRIP 
    ================================================= */ 
 
    if ( 
        text.includes("FOREGRIP") || 
        text.includes("GRIP") 
            && !text.includes("REAR GRIP") 
            && !text.includes("GRIP MOUNT") 
    ) { 
 
        return ` 
            <svg viewBox="0 0 24 24" aria-hidden="true"> 
                <path d="M6 5h12v5H6z"></path> 
                <path d="M9 10v9h6v-9"></path> 
                <path d="M9 14h6"></path> 
            </svg> 
        `; 
 
    } 
 
 
    /* ================================================= 
       UPPER / LOWER / LEFT / RIGHT PATCH 
    ================================================= */ 
 
    if ( 
        text.includes("UPPER PATCH") || 
        text.includes("LOWER PATCH") || 
        text.includes("LEFT PATCH") || 
        text.includes("RIGHT PATCH") 
    ) { 
 
        return ` 
            <svg viewBox="0 0 24 24" aria-hidden="true"> 
                <rect x="4" y="5" width="16" height="14" rx="2"></rect> 
                <path d="M8 8h8M8 12h8M8 16h5"></path> 
            </svg> 
        `; 
 
    } 
 
 
    /* ================================================= 
       OPTIC 
    ================================================= */ 
 
    if ( 
        text.includes("OPTIC") || 
        text.includes("SIGHT") || 
        text.includes("SCOPE") 
    ) { 
 
        return ` 
            <svg viewBox="0 0 24 24" aria-hidden="true"> 
                <circle cx="12" cy="12" r="6"></circle> 
                <circle cx="12" cy="12" r="2"></circle> 
                <path d="M12 2v4M12 18v4M2 12h4M18 12h4"></path> 
            </svg> 
        `; 
 
    } 
 
 
    /* ================================================= 
       KILLFLASH 
    ================================================= */ 
 
    if ( 
        text.includes("KILLFLASH") 
    ) { 
 
        return ` 
            <svg viewBox="0 0 24 24" aria-hidden="true"> 
                <circle cx="12" cy="12" r="8"></circle> 
                <path d="M6 6l12 12"></path> 
                <path d="M9 4l11 11"></path> 
                <path d="M4 9l11 11"></path> 
            </svg> 
        `; 
 
    } 
 
 
    /* ================================================= 
       TACTICAL RISER 
    ================================================= */ 
 
    if ( 
        text.includes("TACTICAL RISER") || 
        text.includes("MULTI-PURPOSE TACTICAL RISER") 
    ) { 
 
        return ` 
            <svg viewBox="0 0 24 24" aria-hidden="true"> 
                <path d="M5 17h14"></path> 
                <path d="M7 17V9h10v8"></path> 
                <path d="M9 9V5h6v4"></path> 
                <path d="M9 5h6"></path> 
            </svg> 
        `; 
 
    } 
 
 
    /* ================================================= 
       RISER OPTIC 
    ================================================= */ 
 
    if ( 
        text.includes("RISER OPTIC") 
    ) { 
 
        return ` 
            <svg viewBox="0 0 24 24" aria-hidden="true"> 
                <path d="M6 18h12"></path> 
                <path d="M8 18V9h8v9"></path> 
                <circle cx="12" cy="6" r="3"></circle> 
            </svg> 
        `; 
 
    } 
 
 
    /* ================================================= 
       OFFSET OPTIC 
    ================================================= */ 
 
    if ( 
        text.includes("OFFSET OPTIC") || 
        text.includes("OFFSET SIGHT") || 
        text.includes("OFFSET RED DOT") 
    ) { 
 
        return ` 
            <svg viewBox="0 0 24 24" aria-hidden="true"> 
                <path d="M6 18h9"></path> 
                <path d="M9 18V9h6"></path> 
                <circle cx="17" cy="7" r="3"></circle> 
            </svg> 
        `; 
 
    } 
 
 
    /* ================================================= 
       MAGAZINE / MAG 
    ================================================= */ 
 
    if ( 
        text.includes("MAGAZINE") || 
        text.includes("MAG //") || 
        text.includes("ROUND MAG") || 
        text.includes("DRUM MAG") || 
        text.includes("EXTENDED MAG") || 
        text.includes("POLYMER MAG") 
    ) { 
 
        return ` 
            <svg viewBox="0 0 24 24" aria-hidden="true"> 
                <path d="M7 3h10v13H7z"></path> 
                <path d="M9 16v5h6v-5"></path> 
                <path d="M9 7h6M9 10h6M9 13h6"></path> 
            </svg> 
        `; 
 
    } 
 
 
    /* ================================================= 
       MAG MOUNT 
    ================================================= */ 
 
    if ( 
        text.includes("MAG MOUNT") || 
        text.includes("MAG ASSIST") 
    ) { 
 
        return ` 
            <svg viewBox="0 0 24 24" aria-hidden="true"> 
                <rect x="5" y="7" width="14" height="10" rx="2"></rect> 
                <path d="M8 7V4h8v3"></path> 
                <path d="M9 12h6"></path> 
            </svg> 
        `; 
 
    } 
 
 
    /* ================================================= 
       GRIP MOUNT 
    ================================================= */ 
 
    if ( 
        text.includes("GRIP MOUNT") || 
        text.includes("GRIP BASE") 
    ) { 
 
        return ` 
            <svg viewBox="0 0 24 24" aria-hidden="true"> 
                <path d="M5 6h14v5H5z"></path> 
                <path d="M9 11v8h6v-8"></path> 
                <path d="M9 15h6"></path> 
            </svg> 
        `; 
 
    } 
 
 
    /* ================================================= 
       REAR GRIP 
    ================================================= */ 
 
    if ( 
        text.includes("REAR GRIP") || 
        text.includes("TOWER GRIP") || 
        text.includes("HEAVY GRIP") 
    ) { 
 
        return ` 
            <svg viewBox="0 0 24 24" aria-hidden="true"> 
                <path d="M8 4h8v6l-2 10h-4L8 10z"></path> 
                <path d="M9 9h6M10 13h4M10 16h4"></path> 
            </svg> 
        `; 
 
    } 
 
 
    /* ================================================= 
       STOCK KIT 
    ================================================= */ 
 
    if ( 
        text.includes("STOCK KIT") || 
        text.includes("INTEGRAL STOCK") 
    ) { 
 
        return ` 
            <svg viewBox="0 0 24 24" aria-hidden="true"> 
                <path d="M4 8h8l4 3h5v6h-7l-5-3H4z"></path> 
                <path d="M4 8v9"></path> 
                <path d="M16 11v6"></path> 
            </svg> 
        `; 
 
    } 
 
 
    /* ================================================= 
       STOCK 
    ================================================= */ 
 
    if ( 
        text.includes("STOCK") || 
        text.includes("CHEEK PAD") 
    ) { 
 
        return ` 
            <svg viewBox="0 0 24 24" aria-hidden="true"> 
                <path d="M4 7h8l4 3h5v6h-7l-5-3H4z"></path> 
                <path d="M4 7v9"></path> 
                <path d="M16 10v6"></path> 
            </svg> 
        `; 
 
    } 
 
 
    /* ================================================= 
       TACTICAL DEVICE 
    ================================================= */ 
 
    if ( 
        text.includes("TACTICAL DEVICE") || 
        text.includes("LASER") || 
        text.includes("LASER-LIGHT") || 
        text.includes("FLASHLIGHT") 
    ) { 
 
        return ` 
            <svg viewBox="0 0 24 24" aria-hidden="true"> 
                <path d="M4 10h9v4H4z"></path> 
                <path d="M13 11l7-3v8l-7-3"></path> 
                <path d="M7 10V7M7 14v3"></path> 
            </svg> 
        `; 
 
    } 
 
 
    /* ================================================= 
       FUNCTIONAL / SPECIAL 
    ================================================= */ 
 
    if ( 
        text.includes("FUNCTIONAL") || 
        text.includes("SPECIAL") || 
        text.includes("M-LOK") || 
        text.includes("KIT") 
    ) { 
 
        return ` 
            <svg viewBox="0 0 24 24" aria-hidden="true"> 
                <path d="M12 3l2.5 5.5L20 11l-5.5 2.5L12 19l-2.5-5.5L4 11l5.5-2.5z"></path> 
            </svg> 
        `; 
 
    } 
 
 
    /* ================================================= 
       DEFAULT 
    ================================================= */ 
 
    return ` 
        <svg viewBox="0 0 24 24" aria-hidden="true"> 
            <circle cx="12" cy="12" r="8"></circle> 
            <path d="M12 8v8M8 12h8"></path> 
        </svg> 
    `; 
 
} 
 
 
/* ===================================================== 
   ATTACHMENT TYPE 
====================================================== */ 
 
function getAttachmentType(attachment) { 
 
    const text = 
        String(attachment).toUpperCase(); 
 
 
    if ( 
        text.includes("BARREL") 
    ) { 
        return "BARREL"; 
    } 
 
 
    if ( 
        text.includes("UPPER RAIL") 
    ) { 
        return "UPPER RAIL"; 
    } 
 
 
    if ( 
        text.includes("LOWER RAIL") 
    ) { 
        return "LOWER RAIL"; 
    } 
 
 
    if ( 
        text.includes("LEFT RAIL") 
    ) { 
        return "LEFT RAIL"; 
    } 
 
 
    if ( 
        text.includes("RIGHT RAIL") 
    ) { 
        return "RIGHT RAIL"; 
    } 
 
 
    if ( 
        text.includes("MUZZLE") || 
        text.includes("SUPPRESSOR") || 
        text.includes("COMPENSATOR") || 
        text.includes("FLASH HIDER") || 
        text.includes("MUZZLE BRAKE") || 
        text.includes("CHOKE") 
    ) { 
        return "MUZZLE"; 
    } 
 
 
    if ( 
        text.includes("RAIL BIPOD") || 
        text.includes("BIPOD") 
    ) { 
        return "RAIL BIPOD"; 
    } 
 
 
    if ( 
        text.includes("FOREGRIP") 
    ) { 
        return "FOREGRIP"; 
    } 
 
 
    if ( 
        text.includes("UPPER PATCH") 
    ) { 
        return "UPPER PATCH"; 
    } 
 
 
    if ( 
        text.includes("LOWER PATCH") 
    ) { 
        return "LOWER PATCH"; 
    } 
 
 
    if ( 
        text.includes("LEFT PATCH") 
    ) { 
        return "LEFT PATCH"; 
    } 
 
 
    if ( 
        text.includes("RIGHT PATCH") 
    ) { 
        return "RIGHT PATCH"; 
    } 
 
 
    if ( 
        text.includes("KILLFLASH") 
    ) { 
        return "KILLFLASH"; 
    } 
 
 
    if ( 
        text.includes("TACTICAL RISER") 
    ) { 
        return "TACTICAL RISER"; 
    } 
 
 
    if ( 
        text.includes("RISER OPTIC") 
    ) { 
        return "RISER OPTIC"; 
    } 
 
 
    if ( 
        text.includes("OFFSET OPTIC") || 
        text.includes("OFFSET SIGHT") || 
        text.includes("OFFSET RED DOT") 
    ) { 
        return "OFFSET OPTIC"; 
    } 
 
 
    if ( 
        text.includes("OPTIC") || 
        text.includes("SIGHT") || 
        text.includes("SCOPE") 
    ) { 
        return "OPTIC"; 
    } 
 
 
    if ( 
        text.includes("MAG MOUNT") || 
        text.includes("MAG ASSIST") 
    ) { 
        return "MAG MOUNT"; 
    } 
 
 
    if ( 
        text.includes("MAGAZINE") || 
        text.includes("MAG //") || 
        text.includes("ROUND MAG") || 
        text.includes("DRUM MAG") || 
        text.includes("EXTENDED MAG") || 
        text.includes("POLYMER MAG") 
    ) { 
        return "MAGAZINE"; 
    } 
 
 
    if ( 
        text.includes("GRIP MOUNT") || 
        text.includes("GRIP BASE") 
    ) { 
        return "GRIP MOUNT"; 
    } 
 
 
    if ( 
        text.includes("REAR GRIP") || 
        text.includes("TOWER GRIP") || 
        text.includes("HEAVY GRIP") 
    ) { 
        return "REAR GRIP"; 
    } 
 
 
    if ( 
        text.includes("STOCK KIT") || 
        text.includes("INTEGRAL STOCK") 
    ) { 
        return "STOCK KIT"; 
    } 
 
 
    if ( 
        text.includes("CHEEK PAD") 
    ) { 
        return "CHEEK PAD"; 
    } 
 
 
    if ( 
        text.includes("STOCK") 
    ) { 
        return "STOCK"; 
    } 
 
 
    if ( 
        text.includes("TACTICAL DEVICE") || 
        text.includes("LASER") || 
        text.includes("LASER-LIGHT") || 
        text.includes("FLASHLIGHT") 
    ) { 
        return "TACTICAL DEVICE"; 
    } 
 
 
    if ( 
        text.includes("FUNCTIONAL") 
    ) { 
        return "FUNCTIONAL"; 
    } 
 
 
    if ( 
        text.includes("SPECIAL") || 
        text.includes("M-LOK") || 
        text.includes("KIT") 
    ) { 
        return "SPECIAL"; 
    } 
 
 
    return "ATTACHMENT"; 
 
} 
 
 
/* ===================================================== 
   CREATE ATTACHMENT ITEMS 
====================================================== */ 
 
data.attachments.forEach( 
    (attachment, index) => { 
 
        const item = 
            document.createElement("div"); 
 
        item.className = 
            "attachment-item"; 
 
 
        const icon = 
            getAttachmentIcon( 
                attachment 
            ); 
 
 
        const type = 
            getAttachmentType( 
                attachment 
            ); 
 
 
        /* 
           Remove the category prefix 
           from the displayed name. 
            
           Example: 
           OPTIC // RED DOT 
            
           becomes: 
           RED DOT 
        */ 
 
        let attachmentName = 
            String(attachment); 
 
 
        if ( 
            attachmentName.includes("//") 
        ) { 
 
            attachmentName = 
                attachmentName 
                    .split("//") 
                    .slice(1) 
                    .join("//") 
                    .trim(); 
 
        } 
 
 
        item.innerHTML = ` 
 
            <span class="attachment-number"> 
                ${String(index + 1).padStart(2, "0")} 
            </span> 
 
            <div class="attachment-icon"> 
                ${icon} 
            </div> 
 
            <div class="attachment-info"> 
 
                <span class="attachment-type"> 
                    ${type} 
                </span> 
 
                <strong class="attachment-name"> 
                    ${attachmentName} 
                </strong> 
 
            </div> 
 
            <b class="attachment-arrow"> 
                ↗ 
            </b> 
 
        `; 
 
 
        weaponAttachmentList.appendChild( 
            item 
        ); 
 
    } 
); 
     
    /* ===================================================== 
       OPEN MODAL 
    ====================================================== */ 
 
    weaponModal.classList.add( 
        "active" 
    ); 
 
    document.body.style.overflow = 
        "hidden"; 
 
 
    /* ===================================================== 
       PLAY VIDEO AFTER ANIMATION 
    ====================================================== */ 
 
    setTimeout(() => { 
 
        if ( 
            weaponModal.classList.contains( 
                "active" 
            ) 
        ) { 
 
            weaponPreviewVideo 
                .play() 
                .catch(() => {}); 
 
        } 
 
    }, 180); 
 
} 
 
 
/* ========================================================= 
   COPY WEAPON CODE 
   ONE LISTENER FOR ALL CARDS 
========================================================= */ 
 
if (weaponCodeCopy) { 
 
    weaponCodeCopy.addEventListener( 
        "click", 
        async () => { 
 
            if ( 
                !weaponCodeInput || 
                !weaponCodeInput.value || 
                weaponCodeInput.value === 
                    "NO CODE ADDED" 
            ) { 
                return; 
            } 
 
 
            try { 
 
                await navigator.clipboard.writeText( 
                    weaponCodeInput.value 
                ); 
 
                weaponCodeStatus.textContent = 
                    "CODE COPIED ✓"; 
 
                weaponCodeCopy.textContent = 
                    "COPIED ✓"; 
 
 
                setTimeout(() => { 
 
                    weaponCodeStatus.textContent = 
                        "READY TO COPY"; 
 
                    weaponCodeCopy.textContent = 
                        "COPY CODE"; 
 
                }, 1800); 
 
 
            } catch (error) { 
 
                /* Fallback for browsers 
                   that block clipboard API */ 
 
                weaponCodeInput.select(); 
 
                document.execCommand( 
                    "copy" 
                ); 
 
                weaponCodeStatus.textContent = 
                    "CODE COPIED ✓"; 
 
                weaponCodeCopy.textContent = 
                    "COPIED ✓"; 
 
 
                setTimeout(() => { 
 
                    weaponCodeStatus.textContent = 
                        "READY TO COPY"; 
 
                    weaponCodeCopy.textContent = 
                        "COPY CODE"; 
 
                }, 1800); 
 
            } 
 
        } 
    ); 
 
} 
 
 
/* ========================================================= 
   WEAPON CARD CLICK 
   EVENT DELEGATION 
========================================================= */ 
 
document.addEventListener( 
    "click", 
    event => { 
 
        const card = 
            event.target.closest( 
                ".weapon-card" 
            ); 
 
        if (!card) return; 
 
        /* 
           Don't let a weapon click 
           accidentally trigger anything 
           else. 
        */ 
 
        event.preventDefault(); 
        event.stopPropagation(); 
 
        openWeaponDetails(card); 
 
    }, 
    true 
); 
 
 
/* ========================================================= 
   CLOSE WEAPON MODAL 
========================================================= */ 
 
function closeWeaponDetails() { 
 
    if (!weaponModal) return; 
 
 
    weaponPreviewVideo.pause(); 
 
    weaponPreviewVideo.removeAttribute( 
        "src" 
    ); 
 
    weaponPreviewVideo.load(); 
 
 
    weaponModal.classList.remove( 
        "active" 
    ); 
 
 
    /* 
       Do not restore scrolling if 
       the existing car video modal 
       is still open. 
    */ 
 
    if ( 
        !videoModal || 
        !videoModal.classList.contains( 
            "active" 
        ) 
    ) { 
 
        document.body.style.overflow = 
            ""; 
 
    } 
 
} 
 
 
/* ========================================================= 
   CLOSE BUTTON 
========================================================= */ 
 
weaponModalClose.addEventListener( 
    "click", 
    event => { 
 
        event.preventDefault(); 
        event.stopPropagation(); 
 
        closeWeaponDetails(); 
 
    } 
); 
 
 
/* ========================================================= 
   CLICK OUTSIDE MODAL 
========================================================= */ 
 
weaponModal.addEventListener( 
    "click", 
    event => { 
 
        if ( 
            event.target === 
            weaponModal 
        ) { 
 
            closeWeaponDetails(); 
 
        } 
 
    } 
); 
 
 
/* ========================================================= 
   ESCAPE KEY 
========================================================= */ 
 
document.addEventListener( 
    "keydown", 
    event => {
 
        if ( 
            event.key === "Escape" && 
            weaponModal.classList.contains( 
                "active" 
            ) 
        ) { 
 
            closeWeaponDetails(); 
 
        } 
 
    } 
); 
 
});