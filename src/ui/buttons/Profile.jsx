import React, { useRef, useState } from 'react'
import ProfileDropdown from '../../components/dropdowns/ProfileDropdown';
import useClickOutside from '../../utils/useClickOutside';

const Profile = () => {


  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const triggerRef = useRef(null);

  useClickOutside(
    menuRef,
    () => setOpen(false),
    { ignoreRefs: [triggerRef] }
  );

  return (
    <div className='profile-container'>

      <div ref={triggerRef} onClick={() => setOpen((prev) => !prev)} className="avatar">
        <img src="/images/avatar-example.jpg" alt="avatar" />
      </div>

      {
        open && <ProfileDropdown ref={menuRef} />
      }

    </div>
  )
}

export default Profile