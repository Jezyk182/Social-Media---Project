import AddPostForm from "./AddPostForm";

const AddPost = () => {

    
    return ( 
        <div className="sad-mx-auto sad-bg-opacity-40 sad-backdrop-blur-sm sad-bg-slate-600 sad-w-fit sad-p-10 sad-rounded-xl sad-mt-40  sad-shadow-2xl sad-shadow-black">
            <h1 className="sad-text-3xl sad-mb-6 sad-font-bold">Add Post</h1>
            <AddPostForm />
        </div>
    );
}
 
export default AddPost