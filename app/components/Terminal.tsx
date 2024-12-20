import { useEffect, useRef, useState } from "react";
import { WebContainer } from '@webcontainer/api';
import { useStore } from 'nanostores/react';
import { terminalStore } from "../stores/terminal";
import { uiStore } from "../stores/ui";


export function Terminal() {
    const terminalRef = useRef<HTMLDivElement | null>(null);
    const [webContainer, setWebContainer] = useState<WebContainer | null>(null);
    const [terminal, setTerminal] = useState<any>(null)
    const terminalState = useStore(terminalStore);
    const ui = useStore(uiStore);

    useEffect(() => {
       (async () => {
         try {
           const wc = await WebContainer.boot()
           setWebContainer(wc)
            await wc.mount({
               '/app/package.json': {
                  file: {
                      contents: JSON.stringify({
                         dependencies: {
                            "express": "latest",
                         },
                       }
                      )
                  }
               },
                '/app/index.js': {
                  file: {
                      contents: `const express = require('express');
                                  const app = express();

                                  app.get('/', (req, res) => {
                                    res.send('Hello from WebContainer!');
                                  });

                                  app.listen(3000, () => console.log('Server started'))
                                  `
                      }
                  }
             })

            const installProcess = await wc.spawn('npm', ['install'], {
                output: false
              })

             installProcess.output.pipeTo(new WritableStream({
                  write(data) {
                    console.log(data)
                    terminalStore.set(prev => prev + data)
                    scrollToBottom()
                   }
             }));

            await installProcess.exit

            const startProcess = await wc.spawn('node', ['/app/index.js'], {
                output: false
             })

            startProcess.output.pipeTo(new WritableStream({
               write(data) {
                  console.log(data)
                 terminalStore.set(prev => prev + data)
                  scrollToBottom()
                }
            }))

           const term = await wc.term.attach(terminalRef.current!)
             setTerminal(term)
           }
           catch(e) {
              console.log(e)
            }
        })();

         return () => {
           if(webContainer) {
             webContainer.teardown();
           }
          }
    }, []);

      const scrollToBottom = () => {
          if (terminalRef.current) {
               terminalRef.current.scrollTop = terminalRef.current.scrollHeight
           }
        };


        const handleInput = async (e: React.KeyboardEvent<HTMLDivElement>) => {
          if(e.key === 'Enter' && webContainer) {
            const command = terminalState.split("\n").pop()
             terminalStore.set(prev => prev + "\n")

            if(command === "clear") {
                 terminalStore.set("")
                return;
             }
            const process =  await webContainer.spawn(command!.split(' ')[0] , command!.split(' ').slice(1), {
                output: false
             })

             process.output.pipeTo(new WritableStream({
                  write(data) {
                  console.log(data)
                    terminalStore.set(prev => prev + data)
                     scrollToBottom()
                   }
             }));

             await process.exit
             terminalStore.set(prev => prev + "\n")
            }
        }

  return (
    <div className={`h-full  p-2 bg-gray-100 dark:bg-gray-800  ${ui.theme === "dark" ? 'border-t-gray-700' : 'border-t-gray-200'} border-t relative overflow-y-scroll`}>
         <div onKeyDown={handleInput}  tabIndex={0} ref={terminalRef} className="h-full w-full text-xs  whitespace-pre-wrap  font-mono outline-none" >
               {terminalState}
        </div>
    </div>
  );
}