import React, { useState } from 'react';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../stores/useAuthStore';
import useUserInfo from '../../stores/useUserInfo';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { loginUser, LoginData } from '../../api/auth';

interface Inputs {
  email: string;
  passwd: string;
}

const schema = z.object({
  email: z.string().nonempty('E-mail address is required!').email('Invalid E-mail address'),
  passwd: z.string().nonempty('Password is required!')
});

const FormLogIn: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>({
    defaultValues: {
      email: '',
      passwd: '',
    },
    resolver: zodResolver(schema)
  });

  const [logInError, setError] = useState('');
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login); // Access the login function from the store
  const getInfo = useUserInfo((state) => state.getInfo);

  const { data, mutate } = useMutation({
    mutationFn: (data : LoginData) => loginUser(data),
    onSuccess: (data : any) => {
      if(data.success) {
        const userInfo = {
          username: data.username,
          email: data.email,
          bio: data.bio,
          pfp: data.pfp
        };
        const accessToken = data.accessToken;
        localStorage.setItem('accessToken', accessToken);
        login(); // Log the user in
        getInfo(userInfo);
        navigate('/'); // Redirect to home
      } else {
        setError(data.message)
      }
    },
    onError: (error: any) => {
        setError(error)
        return error
    }
  })

  const onSubmit: SubmitHandler<Inputs> = (fData : LoginData, e) => {
    e?.preventDefault
    mutate(fData)
    console.log("Mutate data: " + data)
    // mutate(fData)
  };

  return (
    <div className="sad-mx-auto sad-min-w-96">
      <form method="post" onSubmit={handleSubmit(onSubmit)} className="sad-flex sad-flex-col">
        <div className="sad-mb-4">
          <label className="sad-text-lg sad-font-medium sad-text-black">E-mail</label>
          <input
            {...register('email')}
            name="email"
            type="text"
            placeholder="example@email.com"
            className={clsx(
              'sad-mt-1 sad-block sad-rounded-full sad-border-2 sad-border-gray-400 sad-py-2 sad-px-3 sad-text-lg sad-text-black sad-bg-white sad-w-full',
              'focus:sad-outline-none data-[focus]:sad-outline-offset-2 data-[focus]:sad-border-black'
            )}
          />
          <p className="sad-text-red-700">{errors.email?.message}</p>
        </div>
        <div className="sad-mb-4">
          <label className="sad-text-lg sad-font-medium sad-text-black">Password</label>
          <input
            {...register('passwd')}
            name="passwd"
            type="password"
            placeholder="••••••••"
            className={clsx(
              'sad-mt-1 sad-block sad-rounded-full sad-border-2 sad-border-gray-400 sad-py-2 sad-px-3 sad-text-lg sad-text-black sad-bg-white sad-w-full',
              'focus:sad-outline-none data-[focus]:sad-outline-offset-2 data-[focus]:sad-border-black'
            )}
          />
          <p className="sad-text-red-700">{errors.passwd?.message}</p>
        </div>
        <button
          type="submit"
          className="sad-my-6 sad-text-xl sad-py-3 sad-px-4 sad-rounded-full sad-text-white sad-w-full sad-bg-gray-800 sad-font-bold hover:sad-bg-black sad-duration-200"
        >
          Log In
        </button>
      </form>
      {logInError && <p className="sad-text-red-700">{ logInError }</p>}
    </div>
  );
};

export default FormLogIn;
