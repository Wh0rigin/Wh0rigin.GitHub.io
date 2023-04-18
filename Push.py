import subprocess

commit_message = input("请输入提交的消息：")

subprocess.call(['git', 'add', '-A'])
subprocess.call(['git', 'commit', '-m', commit_message])
subprocess.call(['git', 'push', 'origin'])
