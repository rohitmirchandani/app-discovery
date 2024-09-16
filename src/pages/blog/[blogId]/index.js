import blogService from '@/services/blogServices';
import AIresponse from '@/components/AIresponse/AIresponse';
import Integrations from '@/components/Integrations/Integrations';
import { getIntegrations, getPluginsByName } from '@/services/integrationServices';
export async function getServerSideProps(context) {
  const { blogId } = context.params;
  const props = {};
  try {
    const blog = await blogService.getBlogById(blogId);
    props.blog = blog;
    try{
      const integrations = await getIntegrations(blog.apps);
      Object.assign(props, integrations);
    }catch(error){
      console.error('Error fetching integrations:', error);
    }
  } catch (error) {
    console.error('Error fetching blog data:', error); // Return an empty object if there's an error
  }
  return { props };
}

export default function ChatPage({ blog, integrations, pluginData }) {
  return (
    <div>
      <div>
        <AIresponse blogData={blog} user={blog.createdBy}/>
      </div>
      <Integrations integrations = {integrations} pluginData = {pluginData}/>
    </div>
  );
}
