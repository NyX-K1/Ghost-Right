import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const messyText = `um so basically today we are gonna look at this react hook that is kinda cool really effective for managing state in complex applications specifically when you have like a lot of deeply nested components and you dont want to prop drill everything down it makes things so much cleaner and easier to reason about honestly its changed how i write code completely anyway lets jump into the terminal and i can show you what i mean exactly first we need to install the dependency which is pretty standard npm install whatever and then we can start importing it into our main app component right so look at this mess of code we had before it was just props everywhere passing callbacks down five levels deep total nightmare to maintain but with this new pattern we can just wrap everything in a provider and access it directly where we need to its like magic but actually just good computer science principles applied to ui development ok lets run this and see if it compiles hopefully i didnt make any typos live coding is always risky you know how it is anyway looks good so far wait let me check the console log oh nice it actually worked first try which never happens so thats a win okay moving on lets try to refactor this other component using the same pattern and see if we can clean up the render logic a bit more honestly once you start using this you cant really go back to the old way it just feels clunky and verbose this creates such a nice separation of concerns keeping logic separate from presentation layer which is what we always want in scalable architecture right sounds good lets commit this and push it to production just kidding we need to write tests first obviously never skip tests guys seriously its important anyway where was i oh right the reducer function needs to be pure so no side effects in there keep it clean and deterministic inputs to outputs simple as that allows for time travel debugging if you into that sort of thing which is pretty sick actually i used it once to find a race condition that was driving me crazy for days turns out i just forgot to await a promise typical javascript gotcha right so yeah always handle your async code properly or it will bite you in the but later specifically when you have multiple requests firing off at the same time and updating the same state slice race conditions are the worst verify your assumptions always console log is your friend but the debugger is your best friend learn to use it it will save you so much time in the long run anyway i think that covers the basics of this pattern any questions drop them in the chat and ill try to answer them while i sip this coffee which is getting cold by the way tragic`;

const cleanTextOptions = [
    `🚀 **Mastering React State Management: A Developer's Guide**

Stop prop-drilling today. 🛑

I used to drown in a sea of callbacks, passing props down 5 levels just to toggle a single button. It was a maintenance nightmare, and my team hated touching that part of the codebase.

**The Solution:** Context + Hooks.

By wrapping your application in a custom Provider, you can access state *exactly* where you need it. No more "middleman" components cluttering your codebase with props they don't even use.

Here is why this changes everything:
1. **Cleaner Code**: Components only take what they need.
2. **Better Performance**: With memoization, you avoid unnecessary re-renders.
3. **Scalability**: Your app grows without the complexity growing exponentially.

💡 **Pro Tip:** Combine this with a custom reducer for complex logic, and you have a Redux-like power without the boilerplate.

I implemented this pattern last week and reduced our bundle size by 15% while improving developer velocity. Usually, I'm skeptical of new patterns, but this one is the real deal.

What's your preferred way to handle global state?

#ReactJS #WebDev #CodingTips #CleanCode #SoftwareEngineering #Frontend`,

    `🎨 **Why Design Systems Matter More Than You Think**
    
Consistency isn't just aesthetic—it's functional. 🛠️

When we started scaling our UI library, we hit a wall. Every new feature looked *slightly* different. Different shades of blue, slightly different border radii, inconsistent padding. It was a mess.

**The Fix:** A robust Design System.

We moved from hardcoded values to semantic tokens.
*   Instead of \`#0a66c2\`, we use \`--color-primary\`.
*   Instead of \`16px\`, we use \`--spacing-md\`.

**The Results?**
*   **50% Faster Development**: No more debating pixel values.
*   **Instant Theming**: Dark mode took us 2 days, not 2 weeks.
*   **Unified Brand**: The product finally feels like one cohesive experience.

If you're still hardcoding hex values in 2024, it's time to stop. Invest in a token-based architecture. Your future self (and your users) will thank you.

#DesignSystem #UIUX #FrontendArchitecture #WebDesign #CSS modes`,

    `⚡ **Optimizing Web Performance: The Low Hanging Fruit**

Your website is too slow. Here is how to fix it. 📉

We recently audited our main dashboard and found it was loading 2MB of JS on the initial render. Bounce rates were high, conversion was low.

**3 Quick Wins We Implemented:**

1.  **Code Splitting**: We used dynamic imports to only load components when they are visible.
    *   *Result*: Initial bundle size dropped by 40%.
2.  **Image Optimization**: Switched to WebP/AVIF and implemented lazy loading for everything below the fold.
    *   *Result*: LCP (Largest Contentful Paint) improved by 1.2s.
3.  **Caching Strategies**: Properly configured stale-while-revalidate headers for our API data.
    *   *Result*: Instant page navigation for returning users.

Performance isn't just a "nice to have"—it directly impacts revenue. A 100ms delay can hurt conversion rates by 7%.

Don't let unoptimized assets kill your growth. Measure, Optimize, Repeat.

#WebPerf #JavaScript #Optimization #TechDebt #DevOps`,

    `🤖 **AI in Software Engineering: Replacement or Augmentation?**

I've been using AI coding assistants for 6 months correctly. Here is the truth.

There is a lot of fear that AI will replace developers. I don't see it that way. I see it as a jetpack for engineers who know how to fly. 🚀

**How I use it:**
*   **Boilerplate**: Generating types, interfaces, and repetitive utility functions.
*   **Tests**: Writing unit tests for edge cases I might have missed.
*   **Refactoring**: "Explain this legacy code" has saved me hours of reverse engineering.

**Where it fails:**
*   **System Architecture**: AI struggles to understand the "big picture" of a distributed system.
*   **Complex Context**: It doesn't know the business logic constraints that aren't in the code.

**Verdict:** AI won't replace engineers. Engineers who use AI will replace engineers who don't.

Embrace the tools, but don't stop thinking. You are still the pilot.

#AI #SoftwareEngineering #FutureOfWork #Coding #GenerativeAI`
];

const EngineRoom = () => {
    const [status, setStatus] = useState('synthesizing'); // Start active
    const [scrollSpeed, setScrollSpeed] = useState(2);
    const [typedText, setTypedText] = useState('');

    // Select a random text on mount (memoized so it doesn't change on re-renders)
    const [cleanText] = useState(() => cleanTextOptions[Math.floor(Math.random() * cleanTextOptions.length)]);

    const scrollRef = useRef(null);

    // Scrolling Logic (Terminal)
    useEffect(() => {
        const scrollElement = scrollRef.current;
        if (!scrollElement) return;

        let animationFrameId;

        const scroll = () => {
            if (scrollElement) {
                scrollElement.scrollTop += scrollSpeed;
                // Loop back to top to create infinite effect
                if (scrollElement.scrollTop >= scrollElement.scrollHeight / 2) {
                    scrollElement.scrollTop = 0;
                }
            }
            animationFrameId = requestAnimationFrame(scroll);
        };

        animationFrameId = requestAnimationFrame(scroll);
        return () => cancelAnimationFrame(animationFrameId);
    }, [scrollSpeed]);

    // Typing Logic (Canvas) - Loop Effect
    useEffect(() => {
        let isCancelled = false;

        const startTypingCycle = async () => {
            while (!isCancelled) {
                // Phase 1: Typing
                setStatus('synthesizing');
                setScrollSpeed(6); // Fast scroll

                let currentText = "";
                // Type character by character
                for (let i = 0; i < cleanText.length; i++) {
                    if (isCancelled) return;
                    currentText += cleanText[i];
                    setTypedText(currentText);
                    await new Promise(r => setTimeout(r, 20 + Math.random() * 20)); // Random typing speed
                }

                // Phase 2: Pause/Completed
                setStatus('completed');
                setScrollSpeed(1.5); // Slow scroll
                await new Promise(r => setTimeout(r, 3000)); // Wait 3s

                // Phase 3: Reset
                if (isCancelled) return;
                setTypedText('');
            }
        };

        startTypingCycle();
        return () => { isCancelled = true; };
    }, []);

    return (
        <div className="w-full max-w-7xl mx-auto px-6 pt-32 pb-12 grid grid-cols-1 lg:grid-cols-2 gap-12 relative items-start h-[700px]">

            {/* LEFT: Transcript Terminal - Blended */}
            <div className="rounded-xl overflow-hidden flex flex-col relative z-0 h-full border-l-2 border-dashed border-white/5 pl-6">
                {/* Header (Minimal) */}
                <div className="flex items-center gap-2 mb-4 opacity-50">
                    <span className="text-xs font-mono text-green-500 uppercase tracking-widest">/// synthesis_log_stream</span>
                </div>

                {/* Content */}
                <div
                    ref={scrollRef}
                    className="flex-1 overflow-hidden font-mono text-xs md:text-sm text-green-500/60 leading-relaxed font-light select-none relative mask-image-gradient"
                >
                    <div className="absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-[#0e1217] to-transparent z-10"></div>
                    <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-[#0e1217] to-transparent z-10"></div>

                    {/* Repeated text for infinite scroll - Duplicated more times for length */}
                    <div className="whitespace-pre-wrap pb-4">
                        {messyText} {messyText} {messyText} {messyText} {messyText} {messyText}
                    </div>
                </div>
            </div>

            {/* RIGHT: LinkedIn Canvas - Blended */}
            <div className="rounded-xl overflow-hidden flex flex-col relative z-0 h-full pl-6">

                {/* Post Header */}
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-blue-500/20">
                        A
                    </div>
                    <div className="space-y-1">
                        <div className="text-slate-200 font-semibold text-sm">Alex Chen</div>
                        <div className="text-slate-500 text-xs">Senior Frontend Engineer • 12h • <span className="inline-block align-middle transform scale-75">🌐</span></div>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 font-sans text-slate-300 text-sm md:text-base leading-7 whitespace-pre-wrap">
                    {typedText}
                    <span className="w-0.5 h-5 bg-corp-blue inline-block ml-1 animate-pulse align-middle"></span>
                </div>
            </div>

        </div>
    );
};

export default EngineRoom;
