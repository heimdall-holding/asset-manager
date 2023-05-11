import { useMainStore } from '~~/stores/mainStore';

export const stepRedirect = async () => {
  const store = useMainStore();
  const user = store.getUser;
  if(await stepRedirectValidation()) {
    resetWarning();
    return await navigateTo(`/register/step-${user.step}`);
  }
};

export const restrictAuth = async () => {
  const store = useMainStore();
  const user = store.getUser;
  try {
    if (user === null) {
      return;
    }
    if (!await stepRedirectValidation() &&!user) {
      restrictAuthWarning();
      return navigateTo('/login');
    }
  } catch (err) {
    console.log(err);
  }
};

export const restrictNoAuth = async () => {
  const store = useMainStore();
  const user = store.getUser;
  try {
    if (user === null) {
      return;
    }
    if (!await stepRedirectValidation() && !!user) {
      restrictNoAuthWarning();
      return navigateTo('/');
    } 
  } catch (err) {
    console.log(err);
  }
};

export const restrictAdmin = async () => {
  const store = useMainStore();
  const user = store.getUser;
  try {
    if (user === null) {
      return;
    }
  
    if (user === false) {
      return navigateTo('/')
    }
    
    const ranks = await getUserRanks();
    if (!await stepRedirectValidation() && !ranks.includes('Admin')) {
      return navigateTo('/')
    }
  } catch (err) {
    console.log(err);
  }
}

export const restrictAdminSupport = async () => {
  const store = useMainStore();
  const user = store.getUser;
  try {
    if (user === null) {
      return;
    }

    if (user === false) {
      return navigateTo('/')
    }
  
    const ranks = await getUserRanks();
    if (!await stepRedirectValidation() && (!ranks.includes('Admin') || !ranks.includes('Support'))) {
      return navigateTo('/')
    }
  } catch (err) {
    console.log(err);
  }
}

export const reloadMiddleware = async () => {
  console.log('reloadMiddleware')
  const pathName = useRouter().currentRoute.value.fullPath;

  stepRedirect();
  if (pathName === '/login') {
    restrictNoAuth();
  } else if (pathName === '/register/step-1') {
    restrictNoAuth();
  } else if (pathName.includes('register/step-')) {
    restrictAuth();
  } else if (pathName.includes('admin')) {
    restrictAdmin();
  }
};
