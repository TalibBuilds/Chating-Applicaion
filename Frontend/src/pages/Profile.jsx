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
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setPreviewUrl(null);
    }
  };

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
      );

      dispatch(setUser(response.data.user));
      navigate('/me', { replace: true });
    } catch (err) {
      setServerError(err.response?.data?.message || 'Something went wrong. Try again.');
    }
  };

  return (
    <div className='p-2 min-h-screen w-full flex items-center justify-center bg-[#344e41]'>

      <div className='bg-gradient-to-br from-[#3a5a40] to-[#a3b18a] w-full max-w-md rounded-2xl p-6 shadow-[0_10px_50px_rgba(0,55,0,0.55)] text-[#dad7cd]'>

        <div className='flex flex-col items-center gap-4 pt-2'>
          <img
            className='w-20 md:w-30 h-20 md:h-30 object-cover overflow-hidden rounded-full border-2 border-[#dad7cd]/30 shadow-lg'
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
            className='rounded-xl px-3 py-2 text-[#dad7cd] shadow-sm shadow-[#dad7cd]
              placeholder-[#dad7cd]/60 outline-none focus:ring-2
              focus:ring-[#dad7cd]/50 bg-transparent'
          />

          <textarea
            {...register('bio', { required: 'Bio is required' })}
            placeholder='Write your bio here...'
            className='rounded-xl px-3 py-2 text-[#dad7cd] shadow-sm shadow-[#dad7cd]
              placeholder-[#dad7cd]/60 outline-none focus:ring-2
              focus:ring-[#dad7cd]/50 bg-transparent'
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
            className='bg-[#315140] text-[#dad7cd] shadow-sm shadow-[#dad7cd] hover:bg-[#26402f]
              py-3 w-[60%] mx-auto rounded-xl font-semibold
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
