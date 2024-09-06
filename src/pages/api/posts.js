export default function handler(req, res) {
  const markdownContent = `
  # Top CRM Software for 2024

Looking to manage your customer relationships effectively? Here are some of the best CRM software options for 2024 to help you streamline your sales processes and improve customer interactions.

## Recommended CRM Software

| **App**               | **Category**       | **Rating**     | **Platforms**          | **Description**                                                                                                                                     |
|-----------------------|---------------------|----------------|------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------|
| **SalesForce** 🚀     | Sales & Marketing   | ⭐⭐⭐⭐⭐ (4.7/5) | Web, iOS, Android      | SalesForce offers a comprehensive CRM solution with powerful automation, analytics, and integration features to help businesses manage customer relationships and drive sales. |
| **HubSpot CRM** 🌟     | Sales & Marketing   | ⭐⭐⭐⭐⭐ (4.6/5) | Web, iOS, Android      | HubSpot CRM provides an easy-to-use interface with a range of tools for sales tracking, lead management, and marketing automation. Ideal for small to medium-sized businesses. |
| **Zoho CRM** 📊        | Sales & Marketing   | ⭐⭐⭐⭐ (4.4/5)  | Web, iOS, Android      | Zoho CRM offers a flexible and customizable solution with features like sales automation, customer support, and analytics to enhance customer engagement. |
| **Pipedrive** 📈      | Sales Management    | ⭐⭐⭐⭐ (4.3/5)  | Web, iOS, Android      | Pipedrive helps sales teams manage their pipelines, track deals, and automate tasks to close more deals efficiently. |
| **Microsoft Dynamics 365** 🏆 | Enterprise CRM | ⭐⭐⭐⭐ (4.2/5)  | Web, iOS, Android      | Integrates CRM with ERP to offer a comprehensive solution for managing sales, customer service, and marketing operations. |

## More CRM Solutions Coming Soon!

Stay tuned for more recommendations.
  `;
  
  res.status(200).json({ content: markdownContent });
}
