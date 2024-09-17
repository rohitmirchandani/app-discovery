"useclient";
export const runtime = 'edge'; // Ensures the route is run on the Edge Runtimeimport blogService from '@/services/blogServices';
import AIresponse from '@/components/AIresponse/AIresponse';
import Integrations from '@/components/Integrations/Integrations';
import { getIntegrations, getPluginsByName } from '@/services/integrationServices';
import { getUserById } from '@/utils/apiHelper';
export async function getServerSideProps(context) {
  const { blogId } = context.params;
  const props = {};
  try {
    const blog = await blogService.getBlogById(blogId);
    const user = await getUserById(blog?.createdBy);
    props.blog = blog;
    props.user=user;
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

export default function ChatPage({ blog, integrations, pluginData ,user}) {
  return (
    <div>
      <div>
        <AIresponse blogData={blog} user={user}/>
      </div>
      <Integrations integrations = {integrations} pluginData = {pluginData}/>
    </div>
  );
}
