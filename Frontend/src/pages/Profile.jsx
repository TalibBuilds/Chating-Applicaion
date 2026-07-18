import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axiosInstance from '../utils/axiosInstance';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [previewUrl, setPreviewUrl] = useState(null);
  const [serverError, setServerError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm();

  const previewFile = (event) => {
    const file = event.target.files[0];
    if (file) {
      // createObjectURL is much lighter than base64 (FileReader) for previews
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setPreviewUrl(null);
    }
  };

  // cleanup object URL to avoid memory leaks
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const submitHandler = async (data) => {
    setServerError('');
    try {
      const formData = new FormData();
      if (data.avtar && data.avtar.length > 0) {
        formData.append('avtar', data.avtar[0]);
      }
      formData.append('bio', data.bio);

      const response = await axiosInstance.patch(
        '/api/user/profile',
        formData
        // ❌ Content-Type header hata diya — axios khud
        // multipart/form-data + boundary set karega
      );

      dispatch(setUser(response.data.user));
      navigate('/me', { replace: true }); // ✅ success ke baad Home pe bhejo
    } catch (err) {
      setServerError(err.response?.data?.message || 'Something went wrong. Try again.');
    }
  };

  return (
    <div className='p-2 min-h-screen w-full flex items-center justify-center
      bg-[url("/images/3d.avif")] bg-cover'>

      <div className='glass-effect w-full max-w-md rounded-2xl p-6 shadow-2xl text-white'>

        <div className='flex flex-col items-center gap-4 pt-2'>
          <img
            className='w-20 md:w-30 h-20 md:h-30 object-cover overflow-hidden rounded-full border-2 border-white/20 shadow-lg'
            src={previewUrl || '/images/blanck-profile.jpg'}
            alt='Avatar'
          />
          <h1 className='text-lg font-semibold text-center'>
            Please Complete Your Profile!
          </h1>
        </div>

        <form
          onSubmit={handleSubmit(submitHandler)}
          className='w-full flex flex-col gap-4 mt-6'
        >
          <input
            type='file'
            accept='image/*'
            {...register('avtar', { onChange: previewFile })}
            className='glass-effect rounded-xl px-3 py-2 text-white
              placeholder-slate-400 focus:outline-none focus:ring-2
              focus:ring-indigo-500/50'
          />

          <textarea
            {...register('bio', { required: 'Bio is required' })}
            placeholder='Write your bio here...'
            className='glass-effect rounded-xl px-3 py-2 text-white
              placeholder-slate-400 focus:outline-none focus:ring-2
              focus:ring-indigo-500/50'
            rows={3}
          />
          {errors.bio && (
            <p className='text-red-300 text-sm -mt-2'>{errors.bio.message}</p>
          )}

          {serverError && (
            <p className='text-red-300 text-sm text-center'>{serverError}</p>
          )}

          <button
            type='submit'
            disabled={isSubmitting}
            className='glass-effect py-3 w-[60%] mx-auto rounded-xl font-semibold text-white
              mt-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed'
          >
            {isSubmitting ? 'Saving...' : 'Save Profile'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;