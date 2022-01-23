import sublinks from './data.js'

const toggleBtn = document.querySelector('.toggle-btn')
const closeBtn = document.querySelector('.close-btn')
const sidebarWrapper = document.querySelector('.sidebar-wrapper')
const sidebar = document.querySelector('.sidebar-links')
const linkBtns = [...document.querySelectorAll('.link-btn')]
const submenu = document.querySelector('.submenu')
const hero = document.querySelector('.hero')
const nav = document.querySelector('.nav')

toggleBtn.addEventListener('click', () => {
  sidebarWrapper.classList.toggle('show')
})

closeBtn.addEventListener('click', () => {
  sidebarWrapper.classList.toggle('show')
})

// set sidebar
sidebar.innerHTML = sublinks
  .map((item) => {
    const { links, page } = item
    return `<article>
      <h4>${page}</h4>
      <div class="sidebar-sublinks">
      ${links
        .map((item) => {
          const { label, icon, url } = item
          return `
        <a href="${url}"><i class="${icon}"></i>${label}</a>
        `
        })
        .join('')}
      </div>
    </article>`
  })
  .join('')

// link btns
linkBtns.forEach((btn) => {
  btn.addEventListener('mouseover', (e) => {
    const type = e.currentTarget.textContent

    // adjust submenu position by the cord of the selected button
    const tempBtn = e.currentTarget.getBoundingClientRect()
    const center = (tempBtn.left + tempBtn.right) / 2
    const bottom = tempBtn.bottom - 3
    submenu.style.left = `${center}px`
    submenu.style.bottom = `${bottom}px`

    const [{ page, links }] = sublinks.filter((link) => link.page === type)
    submenu.innerHTML = `<h4>${page}</h4>
    <div class="submenu-center"> 
      ${links
        .map((item) => {
          const { label, icon, url } = item
          return `<a href="${url}"><i class="${icon}"></i>${label}</a>`
        })
        .join('')}
    </div>`
    submenu.classList.toggle('show')
  })

  btn.addEventListener('mouseout', () => {
    submenu.classList.toggle('show')
  })
})
