import AIresponse from '@/components/AIresponse/AIresponse';
import Integrations from '@/components/Integrations/Integrations';
import blogServices from '@/services/blogServices';
import { getIntegrations } from '@/services/integrationServices';
import { getUserById } from '@/utils/apiHelper';
import styles from './blogPage.module.scss';
export async function getServerSideProps(context) {
  const { blogId } = context.params;
  const props = {};
  try {
    const blog = await blogServices.getBlogById(blogId);
    const user = await getUserById(blog?.createdBy);
    props.blog = blog;
    props.user=user;
    try{
      const integrations = await getIntegrations(blog.apps);
      props.integrations = integrations;
    }catch(error){
      console.error('Error fetching integrations:', error);
    }
  } catch (error) {
    console.error('Error fetching blog data:', error); // Return an empty object if there's an error
  }
  return { props };
}

export default function ChatPage({ blog, integrations, user}) {
  return (
    <div>
      <div className={styles.container}>
        <AIresponse blogData={blog} user={user} integrations = {integrations}/>
      </div>
      <Integrations integrations = {integrations} />
    </div>
  );
}
