import { authService } from '@/lib/api/services/auth.service';

const Home = async () => {
  let user = null;
  try {
    user = await authService.me();
  } catch (error) {
    console.error('Failed to fetch user in Home', error);
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Home</h1>
      {user ? (
        <pre className="mt-4 p-4 bg-zinc-100 dark:bg-zinc-900 rounded">
          {JSON.stringify(user, null, 2)}
        </pre>
      ) : (
        <p className="mt-4 text-red-500">No se pudo cargar la información del usuario.</p>
      )}
    </div>
  );
};

export default Home;
