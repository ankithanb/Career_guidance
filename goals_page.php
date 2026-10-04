<?php if (isset($_GET['msg'])): ?>
    <div style="background-color: #d4edda; color: #155724; padding: 10px; margin-bottom: 20px; border-radius: 8px; border: 1px solid #c3e6cb;">
        <?php echo htmlspecialchars($_GET['msg']); ?>
    </div>
<?php endif; ?>
