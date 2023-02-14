//import notion
import { Client } from "@notionhq/client";

export default async function handler(req, res) {
  // Get data submitted in request's body.
  const body = req.body

  // Guard clause checks for first and last name,
  // and returns early if they are not found
  if (!body.name || !body.company || !body.request) {
    // Sends a HTTP bad request error code
    return res.status(400).json({ data: 'Information did not get sent!' });
  }

  // Found the name.
  const name = `${body.name}`;
  const company = `${body.company}`;
  const request = `${body.request}`;

  try {
    const notion = new Client({ auth: process.env.ALCHEMOTION_API_KEY });
    
    const response = await notion.pages.create({
        parent: {
            database_id: process.env.NOTION_COMPANYREQUESTS_ID,
        },
        properties: {
            'Name': {
                type: 'title',
                title: [
                {
                    type: 'text',
                    text: {
                        content: name,
                    },
                },
                ],
            },
            'Email': {
                type: 'email',
                email: body.email,
            },
            'Company': {
                type: 'rich_text',
                rich_text: [
                {   
                    type: 'text',
                    text: {
                        content: company,
                    },
                },
                ],
            },
            'Request': {  
                type: 'rich_text',
                rich_text: [
                {
                    type: 'text',
                    text: {
                        content: request,
                    },
                },
                ],
            },
        }    
    });
    console.log(response);
} catch (error) {
    console.error(error.body);
}

res.status(200).json({ data: `${body.name}` })

}

