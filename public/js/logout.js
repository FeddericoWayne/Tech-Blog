// handles user logout requests
const logOut = async () => {

  const response = await fetch('/api/user/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });

  if (response.ok) {
    window.location.replace('/');
  } 
  
  if (response.status == 408) {
    window.location.replace('/');
  }

};
  
  // event listener
  document.getElementById('logout').addEventListener('click', logOut);