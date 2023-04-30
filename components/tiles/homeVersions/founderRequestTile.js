
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



export default function FounderRequestTile( {portfolioList, title, logo, type}) {

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
        console.log(companyName);
        portfolioList.map(value => {
          if (value.properties.Company.title[0].plain_text.toUpperCase() === companyName.toUpperCase()) {
            matchedEmail = companyName;
          }
          else if (companyName === 'Alchemy') {
            matchedEmail = 'Alchemy';
          }
        }).find(e => e) || 'no email found';
    
        return matchedEmail;
      }
      
      if ( session ) {
        console.log(portfolioList);
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
        
            
                <div className={styles.fieldContainer}>
                    {matchedEmail === 'no email found' || matchedEmail === null ? (
                        <div>
                        <Label.Root className={styles.LabelRoot} htmlFor="company">
                            Your Company
                        </Label.Root>
                        <select className={styles.Select} name="company" id="company">
                            {portfolioList.map((link, index) => (
                            <option
                                key={index}
                                value={link.properties.Company.title[0].plain_text}
                            >
                                {link.properties.Company.title[0].plain_text}
                            </option>
                            ))}
                        </select>
                        </div>
                    ) : matchedEmail === 'Alchemy' ? (
                        <input type="hidden" id="company" value="Alchemy" />
                    ) : (
                        <input
                        type="hidden"
                        id="company"
                        value={getCompanyNameFromEmail(session.user.email)}
                        />
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
             { type === "internal" ? ( 
            <>
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

                            ) :  ( null )}
                        </DialogContent>
                    </DialogPortal>
                </DialogRoot>
            </>
            ) : type === "engineering" ? 
            ( 
            <> 
            <DialogRoot>
                <DialogTrigger asChild>
                <div className = {styles.homeFounderDiv}>
                    <div className={styles.logoIcon}>
                        <Image
                        
                            src={
                                "https://s2.googleusercontent.com/s2/favicons?domain_url="
                                + "amazon.com" +
                                "&sz=64"
                            }
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
                    <div className = {styles.stack}>
                        <div className = {styles.titleRow}>
                            <DialogTitle className = {styles.dialogTitle}>Get AWS Credits!</DialogTitle>
                        </div>
                        <ul className = {styles.list}>
                            <li className = {styles.listItem}>Sign up for <strong><a className = {styles.link} href = "https://console.aws.amazon.com/activate/?#/apply">AWS Activate</a></strong></li>
                            <li className = {styles.listItem}>Select <strong>Activate Portfolio</strong> and enter our case sensitive Organization ID <strong>1kV3j</strong> or <strong>1kV3i</strong> to authenticate your application. This Organization ID affiliates your startup with us and helps you receive maximum benefits. </li>
                            <li className = {styles.listeItem}>Package 1 <strong>(1kV3j)</strong>:
                                <ul>
                                    <li>$25k over 24 months or $100k over 12 months in service credits</li>
                                    <li>$10k over 12 months of Business Support credits</li>
                                </ul>
                            </li>
                            <li className = {styles.listeItem}>Package 2 <strong>(1kV3i)</strong>:
                                <ul>
                                    <li>$25k over 24 months in service credits</li>
                                    <li>$5k over 12 months of Business Support credits</li>
                                </ul>
                            </li>
                            <li className = {styles.listItem}>Complete the application form in full and submit–it only takes a few minutes to complete. Please ensure the information you provide matches the information contained within your AWS account (e.g. your company name and email address).</li>
                       </ul>
                    </div>
                </DialogContent>
            </DialogPortal>
            </DialogRoot>
            
            </>
            ) 
            : null}
           
        </div>
    )
}
