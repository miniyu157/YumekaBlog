import os
import subprocess

# 配置参数
SUPPORTED_EXTS = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp']  # 支持的图片格式
THUMBNAIL_WIDTH = 500  # 缩略图宽度
THUMBNAIL_SUFFIX = '_thumbnail'  # 缩略图后缀

def generate_thumbnails():
    # 获取当前目录下所有文件
    files = [f for f in os.listdir('.') if os.path.isfile(f)]
    
    for file in files:
        # 分离文件名和扩展名
        name, ext = os.path.splitext(file)
        ext = ext.lower()
        
        # 跳过非支持格式和已有缩略图
        if ext not in SUPPORTED_EXTS or THUMBNAIL_SUFFIX in name:
            continue
            
        # 构建输出文件名
        output_file = f"{name}{THUMBNAIL_SUFFIX}{ext}"
        
        # 跳过已存在的缩略图
        if os.path.exists(output_file):
            print(f"跳过已存在的文件: {output_file}")
            continue
            
        # 构建FFmpeg命令
        cmd = [
            'ffmpeg',
            '-i', file,
            '-vf', f'scale={THUMBNAIL_WIDTH}:-1',  # 宽度固定500px，高度自动
            '-loglevel', 'error',  # 仅显示错误信息
            '-y',  # 覆盖输出文件（如果存在）
            output_file
        ]
        
        # 执行命令
        try:
            print(f"正在生成: {file} -> {output_file}")
            subprocess.run(cmd, check=True, stderr=subprocess.PIPE)
        except subprocess.CalledProcessError as e:
            print(f"错误: 处理 {file} 失败 - {e.stderr.decode('utf-8')}")
        except Exception as e:
            print(f"意外错误: {str(e)}")

if __name__ == '__main__':
    print("===== 开始生成缩略图 =====")
    generate_thumbnails()
    print("===== 处理完成 =====")