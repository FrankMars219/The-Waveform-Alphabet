// 1. 获取页面上的元素
const keyboard = document.getElementById('keyboard');
const outputContent = document.getElementById('output-content');
const finishBtn = document.getElementById('finish-btn');
const deleteBtn = document.getElementById('delete-btn');
const clearBtn = document.getElementById('clear-btn');
const snowEffect = document.getElementById('snow-effect');
const finalScreen = document.getElementById('final-screen');
const finalText = document.getElementById('final-text');
const mainContainer = document.getElementById('main-container');

// 用于保存用户点击的字母顺序
let currentText = '';

// 2. 自动生成 A-Z 的按钮
const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

alphabet.forEach(letter => {
    const btn = document.createElement('button');
    btn.className = 'wave-btn';
    // 假设图片在 images 文件夹下，命名为 A.png, B.png 等
    btn.innerHTML = `<img src="images/${letter}.png" alt="${letter}">`;
    
    // 给每个按钮添加点击事件
    btn.addEventListener('click', () => {
        addLetter(letter);
    });

    keyboard.appendChild(btn);
});

// 3. 点击波形按钮，将图片添加到文本框
function addLetter(letter) {
    currentText += letter; // 记录字母
    
    // 创建一个图片元素，插入到输入框中
    const img = document.createElement('img');
    img.src = `images/${letter}.png`;
    img.className = 'input-wave-img';
    img.alt = letter;
    
    outputContent.appendChild(img);
}

// 4. 点击“删除上一步”按钮（仅仅是移除最后一个）
deleteBtn.addEventListener('click', () => {
    if (currentText.length > 0) {
        // 移除字符串最后一个字符
        currentText = currentText.slice(0, -1);
        
        // 移除输入框中最后一个图片元素
        if (outputContent.lastChild) {
            outputContent.removeChild(outputContent.lastChild);
        }
    }
});

// 5. 点击“全部清空”按钮
clearBtn.addEventListener('click', () => {
    currentText = '';
    outputContent.innerHTML = ''; // 清空所有图片
});

// 6. 点击“完成 / 解码”按钮，触发特效序列
finishBtn.addEventListener('click', () => {
    if (currentText === '') return; // 如果没输入，不执行

    // 第一步：隐藏主界面
    mainContainer.style.opacity = '0';
    
    // 第二步：显示雪花屏
    setTimeout(() => {
        mainContainer.classList.add('hidden');
        snowEffect.classList.remove('hidden');
        snowEffect.classList.add('active');

        // 第三步：雪花屏持续 2 秒后，切换到黑屏并显示文字
        setTimeout(() => {
            snowEffect.classList.remove('active');
            
            // 将解码后的文字填入黑屏展示区
            finalText.textContent = currentText;
            finalScreen.classList.remove('hidden');
            
            // 延时一点点让透明度动画生效
            setTimeout(() => {
                finalScreen.classList.add('active');
            }, 50);

        }, 2000); // 2000毫秒 = 2秒雪花屏时间

    }, 500); // 500毫秒等待主界面淡出
});
