import React, { useState, useEffect, useContext } from 'react';
import '../../assets/css/global.css';
import '../../assets/css/index.css';
import LogoutIcon from "../../assets/images/logout.svg";
import TrashIcon from "../../assets/images/trash2.svg";
import UserIcon from "../../assets/images/user.svg";
import RefreshIcon from "../../assets/images/refreshcw.svg";
import MoonIcon from "../../assets/images/moon.svg";
import PlusIcon from "../../assets/images/plus.svg";

const Index = () => {
  return (
    <>
      <div className='theme-panel flex flex-col h-full justify-between'>
      < div id="resources" className='w-full flex'>
					<div id="cpu" className="resource-item">
						<div className="text info">CPU: --%, -- cores</div>
						<div className="bar">
							<div className="bar-inner"></div>
						</div>
					</div>
					<div id="ram" className="resource-item">
						<div className="text info">RAM: --GB/--GB</div>
						<div className="bar">
							<div className="bar-inner"></div>
						</div>
					</div>
				</div>
        <div className='grid-importance hidden'>
          <div className='grid-importance-child'></div>
          <div className='importance-of-grid'>Importance of grid in UX</div>
          <div className='grid-importance-inner'>
            <div className='frame-child'></div>
          </div>
          <div className='figma-ui-design'>Figma UI Design</div>
          <div className='frame-div'>
            <div className='frame-item'></div>
          </div>
          <div className='task-1'>Task 1</div>
          <div className='grid-importance-inner1'>
            <div className='frame-inner'></div>
          </div>
          <div className='task-2'>Task 2</div>
          <div className='grid-importance-inner2'>
            <div className='line-div'></div>
          </div>
          <div className='task-3'>Task 3</div>
          <div className='grid-importance-inner3'>
            <div className='frame-child1'></div>
          </div>
          <div className='task-4'>Task 4</div>
        </div>
        <div className='flex flex-col w-full'>
          <div className='logout-panel-wrapper mb-7'>
            <div className='logout-panel'>
              <div className='logout'>
                <img
                  className='log-out-icon'
                  loading='lazy'
                  alt=''
                  src={LogoutIcon}
                />
                <div className='log-out text-white'>Log out</div>
              </div>
              <div className='trash-2-parent'>
                <img
                  className='trash-2-icon'
                  loading='lazy'
                  alt=''
                  src={TrashIcon}
                />

                <div className='delete-conversations-wrapper'>
                  <div className='delete-conversations text-white'>
                    Delete Conversations
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className='flex flex-col w-full '>
            <div className='user-actions mb-7'>
              <div className='theme-buttons'>
                <img
                  className='user-icon'
                  loading='lazy'
                  alt=''
                  src={UserIcon}
                />

                <div className='upgrade-buttons'>
                  <div className='upgrade-to-plus text-white'>Upgrade to plus</div>
                </div>
              </div>
            </div>
            <div className='user-actions1 mb-7'>
              <div className='refresh-cw-parent'>
                <img
                  className='refresh-cw-icon'
                  loading='lazy'
                  alt=''
                  src={RefreshIcon}
                />

                <div className='updates-faq-wrapper'>
                  <div className='updates-faq text-white'>Updates &amp; FAQ</div>
                </div>
              </div>
            </div>
            <div className='user-actions2 mb-7'>
              <div className='moon-parent'>
                <img
                  className='moon-icon'
                  loading='lazy'
                  alt=''
                  src={MoonIcon}
                />

                <div className='dark-mode-wrapper mb-7'>
                  <div className='dark-mode text-white'>Dark mode</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className='chat-background-parent'>
            <div className='chat-background'></div>
            <button className='new-chat flex items-center'>
              <div className='new-chat-child'></div>
              <img className='plus-icon' alt='' src={PlusIcon} />

              <div className='new-chat-wrapper'>
                <div className='new-chat1'>New chat</div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
