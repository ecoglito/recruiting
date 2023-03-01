
// This is the tile that will be displayed on the home page for the founder request section
import styles from "./founderRequestTile.module.css";
import util from "../../../styles/util.module.css";
import Image from "next/image";
import {
    Root as DialogRoot,
    Trigger as DialogTrigger,
    Portal as DialogPortal,
    Overlay as DialogOverlay,
    Content as DialogContent,
    Title as DialogTitle,
    Close as DialogClose,
    Dialog,
    DialogDescription
  } from "@radix-ui/react-dialog";

import { useSession } from "next-auth/react";

import * as Label from '@radix-ui/react-label';



export default function FounderRequestTile( {portfolioList, title, logo}) {

    const { data: session } = useSession();
   
    function getCompanyNameFromEmail(email) {
        let companyName = email.split("@")[1].split(".")[0];
        companyName = companyName[0].toUpperCase() + companyName.slice(1);
        return companyName;
      }
    
      let email; 
      let matchedEmail;
      
      function getMatchedEmail(email, portfolioList) {
        const companyName = getCompanyNameFromEmail(email);
        let matchedEmail = null;
        portfolioList.map(value => {
          if (value.properties.Company.title[0].plain_text.toUpperCase() === companyName.toUpperCase()) {
            matchedEmail = companyName;
          }
        }).find(e => e) || 'no email found';
    
        return matchedEmail;
      }
      
      if ( session ) {
        email = session.user.email;
        const companyName = getCompanyNameFromEmail(email);
       
        matchedEmail = getMatchedEmail(email, portfolioList);
      } else {
        email = null;
      };
      
      

    const RequestForm = () => {

        const handleSubmit = async (event) => {
            // Stop the form from submitting and refreshing the page.
            event.preventDefault()
        
            // Get data from the form.
            const data = {
            name: event.target.name.value,
            email: event.target.email.value,
            company: event.target.company.value,
            request: event.target.request.value,
            }
        
            // Send the data to the server in JSON format.
            const JSONdata = JSON.stringify(data)
        
            // API endpoint where we send form data.
            const endpoint = '/api/requestform'
        
            // Form the request for sending data to the server.
            const options = {
            // The method is POST because we are sending data.
            method: 'POST',
            // Tell the server we're sending JSON.
            headers: {
                'Content-Type': 'application/json',
            },
            // Body of the request is the JSON data we created above.
            body: JSONdata,
            }
        
            // Send the form data to our forms API on Vercel and get a response.
            const response = await fetch(endpoint, options)
        
            // Get the response data from server as JSON.
            // If server returns the name submitted, that means the form works.
            const result = await response.json()
            alert(`Thanks, ${result.data} we successfully submitted your request!` )
        }

        return (
            // We pass the event to the handleSubmit() function on submit.
            <div>
            <form onSubmit={handleSubmit}>
    
                <input type="hidden" id="name" name="name" value={session.user.name}/>
    
                <input type="hidden" id="email" name="email" value={session.user.email}/>
        
            
                <div className = {styles.fieldContainer}>
                   
                    {matchedEmail === 'no email found' || matchedEmail === null ? (
                        <div>
                            <Label.Root className={styles.LabelRoot} htmlFor="company">
                            Your Company
                            </Label.Root>
                            <select className={styles.Select} name="company" id="company">
                                {portfolioList.map((link, index) => (
                                <option key={index} value={link.properties.Company.title[0].plain_text}>
                                    {link.properties.Company.title[0].plain_text}
                                </option>
                                ))}
                            </select>
                        </div>
                        ) : (
                        <input type="hidden" id="company" value={getCompanyNameFromEmail(session.user.email)} />
                        )}
                </div>

                <div className={styles.fieldContainer}>
                <textarea className={styles.textArea} id="request" name="request" required placeholder='Ex. "I want to get product feedback from someone on your design team."'/>
                </div>


                <div className = {util.marginTop}>
                    <button className={util.primaryButton + " " + util.primaryButtonContainer} type="submit">Submit</button>
                </div>
            </form>
            </div>
        )
    }

    const RequestIntroForm = () => {

        const handleSubmit = async (event) => {
            // Stop the form from submitting and refreshing the page.
            event.preventDefault()
        
            // Get data from the form.
            const data = {
            name: event.target.name.value,
            email: event.target.email.value,
            company: event.target.company.value,
            introName: event.target.introName.value,
            introCompany: event.target.introCompany.value,
            introReason: event.target.introReason.value,
            }
        
            // Send the data to the server in JSON format.
            const JSONdata = JSON.stringify(data)
        
            // API endpoint where we send form data.
            const endpoint = '/api/introform'
        
            // Form the request for sending data to the server.
            const options = {
            // The method is POST because we are sending data.
            method: 'POST',
            // Tell the server we're sending JSON.
            headers: {
                'Content-Type': 'application/json',
            },
            // Body of the request is the JSON data we created above.
            body: JSONdata,
            }
        
            // Send the form data to our forms API on Vercel and get a response.
            const response = await fetch(endpoint, options)
        
            // Get the response data from server as JSON.
            // If server returns the name submitted, that means the form works.
            const result = await response.json()
            alert(`Thanks, ${result.data} we successfully submitted your request!` )
        }

        return (
            // We pass the event to the handleSubmit() function on submit.
            <div>
            <form onSubmit={handleSubmit}>
           
                <input type="hidden" id="name" name="name" value={session.user.name}></input>
                <input type="hidden" id="email" name="email" value={session.user.email}></input>
            
                <div className = {styles.fieldContainer}>
                   
                   {matchedEmail === 'no email found' || matchedEmail === null ? (
                       <div>
                           <Label.Root className={styles.LabelRoot} htmlFor="company">
                           Your Company
                           </Label.Root>
                           <select className={styles.Select} name="company" id="company">
                               {portfolioList.map((link, index) => (
                               <option key={index} value={link.properties.Company.title[0].plain_text}>
                                   {link.properties.Company.title[0].plain_text}
                               </option>
                               ))}
                           </select>
                       </div>
                       ) : (
                       <input type="hidden" id="company" value={getCompanyNameFromEmail(session.user.email)} />
                       )}
               </div>

                <div className = {styles.fieldContainer}>
                    <Label.Root className={styles.LabelRoot} htmlFor="introName">
                        Their Name
                    </Label.Root>
                    <input className={styles.Input} type="text" id="introName" name="introName" required />
                </div>

                <div className = {styles.fieldContainer}>
                    <Label.Root className={styles.LabelRoot} htmlFor="introCompany">
                        Their Company
                    </Label.Root>
                    <input className={styles.Input} type="text" id="introCompany" name="introCompany" required />
                </div>
    
                <div className = {styles.fieldContainer}>
                    <Label.Root className={styles.LabelRoot} htmlFor="introReason">
                        Reason For Intro
                    </Label.Root>
                    <textarea className={styles.textArea + " " + styles.textAreaNoMargin} id="introReason" name="introReason" required placeholder='Ex. "I really want to meet someone from a16z and pitch them!"'/>
            
                </div>

                <div className = {util.marginTop}>
                    <button className={util.primaryButton + " " + util.primaryButtonContainer} type="submit">Submit</button>
                </div>
            </form>
            </div>
        )
    }




    return (
        <div>
            <DialogRoot>
                <DialogTrigger asChild>
                <div className = {styles.homeFounderDiv}>
                    <div className={styles.logoIcon}>
                        <Image
                            className = {"iconInvert"}
                            src={"/feather/" + logo + ".svg"}
                            height={66}
                            width={66}
                            alt="request"
                        />
                    </div>
                        <p>{title}</p>
                </div>
            </DialogTrigger>
            <DialogPortal>
                <DialogOverlay className={styles.overlay} />
                <DialogContent className = {styles.content}>
                    {title === "Reach out to us" ? (
                    <>
                        <div className = {styles.titleRow}>
                    
                            <DialogTitle className = {styles.dialogTitle}>Make A Request</DialogTitle>
                            <div className={styles.logoIcon + " " + styles.large}>
                                 <Image className = {"iconInvert"} src={"/feather/" + "wizard" + ".svg"} height={66} width={66} alt="request" />
                                </div>
                        </div>
                            <RequestForm />
                    </>
                      
                    ) : 
                    title === "Request an intro" ? (
                        <div>

                            <div className = {styles.titleRow}>
                        
                                <DialogTitle className = {styles.dialogTitle}>Request An Intro</DialogTitle>
                                <div className={styles.logoIcon + " " + styles.large}>
                                    <Image className = {"iconInvert"} src={"/feather/" + "help" + ".svg"} height={66} width={66} alt="request" />
                                    </div>
                            </div>
                            <RequestIntroForm />
                        </div>

                    ) :
                    title === "Get AWS Credits" ? (
                        <div>
                            {/* <DialogTitle className = {styles.dialogTitle}>Get AWS Credits</DialogTitle> */}
                            <p>Coming soon...</p>
                         </div>
                    ) : null }
                </DialogContent>
            </DialogPortal>
            </DialogRoot>
        </div>
    )
}
