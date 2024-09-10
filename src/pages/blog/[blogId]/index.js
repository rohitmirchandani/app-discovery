import blogService from '@/services/blogServices';
import AIresponse from '@/components/AIresponse/AIresponse';
export async function getServerSideProps(context) {
  const { blogId } = context.params;
  
  try {
    const blog = await blogService.getBlogById(blogId);
    return { props: { blog } };
  } catch (error) {
    console.error('Error fetching blog data:', error);
    return { props: { messages: {} } }; // Return an empty object if there's an error
  }
}

export default function ChatPage({ blog }) {
  return (
    <div>
      <div>
        <AIresponse blogData={blog} />
      </div>
    </div>
  );
}
