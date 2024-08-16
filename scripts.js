document.addEventListener('DOMContentLoaded', () => {
    // 初期設定とDOM要素の取得
    const versionRadios = document.querySelectorAll('input[name="version"]');
    const bedrockForm = document.getElementById('bedrock');
    const javaForm = document.getElementById('java');

    const bedrockOpForm = document.getElementById('bedrock-op-form');
    const bedrockNoOpForm = document.getElementById('bedrock-no-op-form');
    const javaOpForm = document.getElementById('java-op-form');
    const javaNoOpForm = document.getElementById('java-no-op-form');

    const bedrockPlayerNameForm = document.getElementById('bedrock-player-name-form');
    const javaPlayerNameForm = document.getElementById('java-player-name-form');

    const commandOutput = document.getElementById('command-output');
    const copyBtn = document.getElementById('copy-btn');

    const editDetailBtn = document.getElementById('edit-detail-btn');
    const detailEditDiv = document.getElementById('java-detail-edit');

    // コマンド生成関数
    function updateCommand() {
        const version = document.querySelector('input[name="version"]:checked').value;
        let command = '';

        if (version === 'bedrock') {
            const op = document.getElementById('bedrock-op').value === 'true';
            const selector = document.getElementById('bedrock-selector').value;
            const playerName = document.getElementById('bedrock-player-name').value;

            if (selector === '<プレイヤー名>') {
                document.getElementById('bedrock-selector').value = playerName;
            }

            if (op) {
                const username = document.getElementById('bedrock-username').value;
                const message = document.getElementById('bedrock-message').value;
                command = `/tellraw ${selector} {"rawtext":[{"text":"<${username}> ${message}"}]}`;
            } else {
                const message = document.getElementById('bedrock-no-op-message').value;
                command = `${message}`;
            }
        } else if (version === 'java') {
            const op = document.getElementById('java-op').value === 'true';
            const detailEdit = document.getElementById('java-detail-edit-value').value || ':';
            const selector = document.getElementById('java-selector').value;
            const playerName = document.getElementById('java-player-name').value;
            const lunachat = document.getElementById('java-lunachat').value;

            if (selector === '<プレイヤー名>') {
                document.getElementById('java-selector').value = playerName;
            }

            if (op) {
                const username = document.getElementById('java-username').value;
                const message = document.getElementById('java-message').value;
                command = `/tellraw ${selector} [{"text":"${username}","color":"white"},{"text":"${detailEdit}","color":"green"},{"text":" ${message}","color":"white"}]`;
                if (lunachat) {
                    command = command.replace('}]', `},{"text":" (${lunachat})","color":"gold"}]`);
                }
            } else {
                const message = document.getElementById('java-no-op-message').value;
                const lunachat = document.getElementById('java-no-op-lunachat').value;
                command = `${message}${lunachat ? ` &6(${lunachat})` : ''}`;
            }
        }

        commandOutput.textContent = command;
    }

    // 詳細編集のトグル
    function toggleDetailEdit() {
        detailEditDiv.classList.toggle('hidden');
        if (!detailEditDiv.classList.contains('hidden')) {
            document.getElementById('java-detail-edit-value').focus();
        }
        updateCommand();
    }

    // 各イベントの設定
    versionRadios.forEach(radio => {
        radio.addEventListener('change', () => {
            const version = document.querySelector('input[name="version"]:checked').value;
            if (version === 'bedrock') {
                bedrockForm.style.display = 'block';
                javaForm.style.display = 'none';
            } else {
                bedrockForm.style.display = 'none';
                javaForm.style.display = 'block';
            }
            updateCommand();
        });
    });

    const inputs = document.querySelectorAll('input, select');
    inputs.forEach(input => {
        input.addEventListener('input', updateCommand);
    });

    document.getElementById('bedrock-op').addEventListener('change', () => {
        const op = document.getElementById('bedrock-op').value === 'true';
        bedrockOpForm.style.display = op ? 'block' : 'none';
        bedrockNoOpForm.style.display = op ? 'none' : 'block';
        updateCommand();
    });

    document.getElementById('java-op').addEventListener('change', () => {
        const op = document.getElementById('java-op').value === 'true';
        javaOpForm.style.display = op ? 'block' : 'none';
        javaNoOpForm.style.display = op ? 'none' : 'block';
        javaPlayerNameForm.style.display = document.getElementById('java-selector').value === '<プレイヤー名>' ? 'block' : 'none';
        updateCommand();
    });

    document.getElementById('java-selector').addEventListener('change', () => {
        javaPlayerNameForm.style.display = document.getElementById('java-selector').value === '<プレイヤー名>' ? 'block' : 'none';
        updateCommand();
    });

    editDetailBtn.addEventListener('click', toggleDetailEdit);

    copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(commandOutput.textContent).then(() => {
            alert('コマンドがコピーされました!');
        }, (err) => {
            console.error('コピーに失敗しました: ', err);
        });
    });

    // 初期表示の更新
    const initialVersion = document.querySelector('input[name="version"]:checked').value;
    if (initialVersion === 'bedrock') {
        bedrockForm.style.display = 'block';
        javaForm.style.display = 'none';
    } else {
        bedrockForm.style.display = 'none';
        javaForm.style.display = 'block';
    }

    const initialOp = document.getElementById('bedrock-op').value === 'true';
    bedrockOpForm.style.display = initialOp ? 'block' : 'none';
    bedrockNoOpForm.style.display = initialOp ? 'none' : 'block';

    const initialJavaOp = document.getElementById('java-op').value === 'true';
    javaOpForm.style.display = initialJavaOp ? 'block' : 'none';
    javaNoOpForm.style.display = initialJavaOp ? 'none' : 'block';
    javaPlayerNameForm.style.display = document.getElementById('java-selector').value === '<プレイヤー名>' ? 'block' : 'none';
});
